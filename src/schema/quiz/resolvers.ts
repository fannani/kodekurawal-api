import { shuffle } from 'lodash';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Quiz: {
    stage: (quiz, __, { models }) => models.stage.findOne({ _id: quiz.stage }),
  },
  Query: {
    quiz: async (_, { where, random }, { models }) => {
      const quiz = await models.quiz.findOne(where);

      if (quiz) {
        const indexedQuestions = quiz.questions.map(
          (value: any, index: number) => ({ ...value, index })
        );
        const essay = indexedQuestions.filter(
          (value: any) => value.questionType === 'ESSAY'
        );
        const choice = indexedQuestions.filter(
          (value: any) => value.questionType === 'MULTIPLE_CHOICE'
        );
        if (random) {
          const randomEssay = shuffle(essay);
          const randomChoice = shuffle(choice);
          const randomizeQuestions = randomChoice.concat(randomEssay);
          quiz.questions = randomizeQuestions;
        } else {
          quiz.questions = indexedQuestions;
        }
      }
      return quiz;
    },
    allQuiz: (_, __, { models }) => models.quiz.find(),
  },
  Mutation: {
    createQuiz: (_, { input }, { models }) => {
      return models.quiz.create(input);
    },
    submitQuiz: async (_, { input }, { models }) => {
      if (input.answer) {
        input.answer.sort((a, b) => {
          return a!.index - b!.index;
        });
      }
      const master = await models.quiz.findOne({ _id: input.quiz });
      let essayLen = 0;
      let choiceLen = 0;
      master.questions.forEach((question: any) => {
        if (question.questionType === 'MULTIPLE_CHOICE') choiceLen++;
        if (question.questionType === 'ESSAY') essayLen++;
      });
      const essayScore = 50 / essayLen;
      const choiceScore = 50 / choiceLen;
      const len = input.answer ? input.answer.length : 0;
      let score = 0;
      for (let i = 0; i < len; ++i) {
        const question = master.questions[i];
        if (
          question.questionType === 'MULTIPLE_CHOICE' &&
          question.answer === input.answer![i]!.answer
        ) {
          score += choiceScore;
        }
        if (question.questionType === 'ESSAY') {
          const word = question.answer.split(' ');
          const wordCount = word.length;
          let wordMatch = 0;
          for (let a = 0; a < wordCount; ++a) {
            if (input.answer![i]!.answer!.includes(word[a])) ++wordMatch;
          }
          score += (wordMatch / wordCount) * essayScore;
        }
      }
      const answer = input.answer!.map(val => val!.answer);
      return models.score.create({
        score: Math.ceil(score),
        player: input.player,
        stage: master.stage,
        answer,
      });
    },
    updateQuiz: (_, { id, input }, { models }) =>
      models.quiz.findByIdAndUpdate(id, input),
    deleteQuiz: async (_, { id }, { models }) => {
      const quiz = await models.quiz.findOne({ _id: id });
      await models.quiz.deleteOne({ _id: id });
      return quiz;
    },
  },
};

export default resolvers;
