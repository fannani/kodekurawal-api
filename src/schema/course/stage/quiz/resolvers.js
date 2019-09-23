import { merge, shuffle } from 'lodash';

const resolvers = {
  Evaluation: {
    content: (evaluation, __, { db }) => db.evaluation({ id: evaluation.id }).content(),
  },
  // TODO : Sections
  Query: {
    evaluation: async (_, { where, random }, { db }) => {
      const evaluations = await db.evaluations({
        where: {
          content: { id: where.content },
        },
      });
      const evaluation = evaluations[0];
      if (evaluation) {
        const indexedQuestions = evaluation.questions.map((value, index) => {
          value.index = index;
          return value;
        });
        const essay = indexedQuestions.filter((value) => value.type === 'ESSAY');
        const choice = indexedQuestions.filter((value) => value.type === 'MULTIPLE_CHOICE');
        if (random) {
          const randomEssay = shuffle(essay);
          const randomChoice = shuffle(choice);
          const randomizeQuestions = randomChoice.concat(randomEssay);
          evaluation.questions = randomizeQuestions;
        } else {
          evaluation.questions = indexedQuestions;
        }
      }
      return evaluation;
    },
    evaluations: (_, __, { db }) => db.evaluations(),
  },
  Mutation: {
    createEvaluation: (_, { input }, { db }) => {
      const data = {
        time: input.time,
        questions: {
          create: [],
        },
      };
      data.questions.create = input.questions.map((question) => ({
        score: question.score,
        question: {
          create: {
            content: question.question.content,
            type: question.question.type,
            choice: { set: question.question.choice },
            answer: question.question.answer,
          },
        },
      }));
      return db.createEvaluation(data);
    },
    upsertEvaluation: async (_, { id, data }, { db }) => {
      const questionsData = data.questions.map((q) => ({
        content: q.content,
        type: q.type,
        choice: { set: q.choice },
        answer: q.answer,
        score: q.score,
      }));

      const content = {
        time: data.time,
        contentId: data.content,
        content: {
          connect: {
            id: data.content,
          },
        },
        questions: {
          create: questionsData,
        },
      };
      const evaluationExists = await db.$exists.evaluation({ id });
      if (evaluationExists) {
        await db.updateEvaluation({
          where: { id },
          data: {
            questions: {
              deleteMany: [{ score_not: -99 }],
            },
          },
        });
      }
      return db.upsertEvaluation({ where: { id }, update: content, create: content });
    },
    submitEvaluation: async (_, { input }, { db }) => {
      input.answer.sort((a, b) => (a.index - b.index));
      const master = await db.evaluation({ id: input.evaluation });
      let essayLen = 0;
      let choiceLen = 0;
      const questLen = master.questions.length;
      for (let i = 0; i < questLen; ++i) {
        const question = master.questions[i];
        if (question.type === 'MULTIPLE_CHOICE') choiceLen++;
        if (question.type === 'ESSAY') essayLen++;
      }
      const essayScore = (50 / essayLen);
      const choiceScore = (50 / choiceLen);
      const len = input.answer.length;
      let score = 0; //
      for (let i = 0; i < len; ++i) {
        const question = master.questions[i];
        if (question.type === 'MULTIPLE_CHOICE' && question.answer === input.answer[i].answer) { score += choiceScore; }
        if (question.type === 'ESSAY') {
          const word = question.answer.split(' ');
          const wordCount = word.length;
          let wordMatch = 0;
          for (let a = 0; a < wordCount; ++a) {
            if (input.answer[i].answer.includes(word[a])) ++wordMatch;
          }
          score += ((wordMatch / wordCount) * essayScore);
        }
      }
      const answer = input.answer.map((val) => val.answer);
      return db.createScore({
        score: Math.ceil(score),
        user: { connect: { id: input.user } },
        evaluation: { connect: { id: input.evaluation } },
        evaluationId: input.evaluation,
        answer: { set: answer },
      });
    },
    updateEvaluation: (_, { id, input }, { db }) => db.updateEvaluation({ data: input, where: { id } }),
    deleteEvaluation: (_, { id }, { db }) => db.deleteEvaluation({ id }),
  },
};

export default merge(resolvers);
