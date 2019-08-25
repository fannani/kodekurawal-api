import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
} from 'graphql';

import CourseType from '../type';
import QuestionType from './Question/type';
import Stage from './Stage';
import Course from '../Course';
import Mission from './Mission/Mission';
import MissionType from './Mission/type';

const Type = new GraphQLEnumType({
  name: 'StageType',
  values: {
    CODING: { value: "CODING" },
    MATERIAL: { value: "MATERIAL" },
    QUIZ: {value : "QUIZ"}
  }
});


const StageType = new GraphQLObjectType({
  name: 'Stage',
  description: 'This represent a Stage',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    type : { type : Type },
    questions : { type: GraphQLList(QuestionType)},
    teory: { type: GraphQLString },
    exp_reward: { type: GraphQLInt },
    index: { type: GraphQLInt },
    time: { type: GraphQLInt },
    win: { type: GraphQLBoolean },
    score: { type: GraphQLInt },
    badge_name: { type: GraphQLString },
    badge_image: { type: GraphQLString },
    language: { type: GraphQLString },
    stars: { type: GraphQLList(GraphQLBoolean) },
    imageid: { type: GraphQLString },
    script: { type: GraphQLString },
    missions: {
      type: GraphQLList(MissionType),
      async resolve({ _id }) {
        const missions = await Mission.find({ stage: _id });
        return missions;
      },
    },

    course: {
      type: CourseType,
      async resolve({ _id }) {
        let stage = await Stage.findOne({ _id });
        let course = await Course.findOne({ _id: stage.course });
        return course;
      },
    },
    updated_at: { type: GraphQLNonNull(GraphQLString) },
  }),
});

export default StageType;
