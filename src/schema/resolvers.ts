import { merge } from 'lodash';
import user from './user/resolvers';
import testcase from './testcase/resolvers';
import quiz from './quiz/resolvers';
import player from './player/resolvers';
import playerAchievement from './playerAchievement/resolvers';
import playerLevel from './playerLevel/resolvers';
import missionTestcase from './missionTestcase/resolvers';
import mission from './mission/resolvers';
import material from './material/resolvers';
import file from './file/resolvers';
import course from './course/resolvers';
import leaderboard from './leaderboard/resolvers';
import badge from './badge/resolvers';
import avatar from './avatar/resolvers';
import achievement from './achievement/resolvers';
import achievementDetail from './achievementDetail/resolvers';

export default merge(
  achievement,
  avatar,
  achievementDetail,
  badge,
  course,
  testcase,
  user,
  file,
  leaderboard,
  player,
  playerAchievement,
  playerLevel,
  quiz,
  missionTestcase,
  mission,
  material
);
