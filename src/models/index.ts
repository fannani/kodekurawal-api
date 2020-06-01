import User from './User';
import Achievement from './Achievement';
import DetailAchievement from './DetailAchievement';
import Avatar from './Avatar';
import Badge from './Badge';
import Course from './Course';
import Material from './Material';
import File from './File';
import Mission from './Mission';
import Player from './Player';
import PlayerAchievement from './PlayerAchievement';
import PlayerLevel from './PlayerLevel';
import Quiz from './Quiz';
import Score from './Score';
import Stage from './Stage';
import TestCase from './TestCase';
import TestCaseMission from './TestCaseMission';

export interface Models {
  user: any;
  achievement: any;
  detailAchievement: any;
  avatar: any;
  badge: any;
  course: any;
  file: any;
  material: any;
  mission: any;
  player: any;
  playerAchievement: any;
  playerLevel: any;
  quiz: any;
  score: any;
  stage: any;
  testcase: any;
  testcaseMission: any;
}

const models: Models = {
  user: User,
  achievement: Achievement,
  detailAchievement: DetailAchievement,
  avatar: Avatar,
  badge: Badge,
  course: Course,
  file: File,
  material: Material,
  mission: Mission,
  player: Player,
  playerAchievement: PlayerAchievement,
  playerLevel: PlayerLevel,
  quiz: Quiz,
  score: Score,
  stage: Stage,
  testcase: TestCase,
  testcaseMission: TestCaseMission,
};

export default models;
