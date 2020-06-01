import gql from 'graphql-tag';
import Achievement from './achievement/typeDef';
import AchievementDetail from './achievementDetail/typeDef';
import Avatar from './avatar/typeDef';
import Badge from './badge/typeDef';
import Course from './course/typeDef';
import File from './file/typeDef';
import Leaderboard from './leaderboard/typeDef';
import Material from './material/typeDef';
import Mission from './mission/typeDef';
import MissionTestcase from './missionTestcase/typeDef';
import Player from './player/typeDef';
import PlayerAchievement from './playerAchievement/typeDef';
import PlayerLevel from './playerLevel/typeDef';
import Quiz from './quiz/typeDef';
import Score from './score/typeDef';
import Testcase from './testcase/typeDef';
import User from './user/typeDef';
import Compiler from './compiler/typeDef';
import Stage from './stage/typeDef';

const typeDef = gql`
  type Mutation
  type Query
`;

export default [
  typeDef,
  User,
  Testcase,
  Stage,
  Score,
  Quiz,
  PlayerLevel,
  PlayerAchievement,
  Player,
  MissionTestcase,
  Mission,
  Material,
  Leaderboard,
  Achievement,
  AchievementDetail,
  Avatar,
  Badge,
  Course,
  Stage,
  File,
  Compiler,
];
