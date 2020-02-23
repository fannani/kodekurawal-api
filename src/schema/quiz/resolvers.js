import {  shuffle } from 'lodash';
import Quiz from '../../models/Quiz';
import Stage from '../../models/Stage';
const resolvers = {
  Quiz: {
    stage: (quiz, __) => Stage.findOne({ _id: quiz.stage }),
  },
  Query: {
    quiz: async (_, { where, random }) => {
      const quiz = await Quiz.findOne(where);

      if (quiz) {
        const indexedQuestions = quiz.questions.map((value, index) => {
          value.index = index;
          return value;
        });
        const essay = indexedQuestions.filter((value) => value.questionType === 'ESSAY');
        const choice = indexedQuestions.filter((value) => value.questionType === 'MULTIPLE_CHOICE');
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
    allQuiz: (_, __) => Quiz.find()
  },
  Mutation: {
    createQuiz: (_, { input }) => {
      const quiz = new Quiz(input);
      return quiz.save();
    },
    submitQuiz: async (_, { input }) => {
      input.answer.sort((a, b) => (a.index - b.index));
      const master = await Quiz.findOne({ _id: input.quiz });
      let essayLen = 0;
      let choiceLen = 0;
      for (question of master.questions) {
        if (question.questionType === 'MULTIPLE_CHOICE') choiceLen++;
        if (question.questionType === 'ESSAY') essayLen++;
      }
      const essayScore = (50 / essayLen);
      const choiceScore = (50 / choiceLen);
      const len = input.answer.length;
      let score = 0;
      for (let i = 0; i < len; ++i) {
        const question = master.questions[i];
        if (question.questionType === 'MULTIPLE_CHOICE' && question.answer === input.answer[i].answer) { score += choiceScore; }
        if (question.questionType === 'ESSAY') {
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
      const scoreData = new Score({
        score: Math.ceil(score),
        player:  input.user ,
        stage : master.stage,
        answer:  answer ,
      });
      return scoreData.save();
    },
    updateQuiz:  (_, { id, input }) => Quiz.findByIdAndUpdate( id,  input),
    deleteQuiz: async (_, { id }) => {
      const quiz = await Quiz.findOne({ _id : id });
      await Quiz.deleteOne({_id : id});
      return quiz;
    },
  },
};

export default resolvers;
