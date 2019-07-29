import { GraphQLID, GraphQLList } from 'graphql';
import TestCaseMission from './TestCaseMission';
import TestCaseMissionType from './type';

const testCaseMissions = {
  type: new GraphQLList(TestCaseMissionType),
  description: 'List of all TestCase Mission',
  args: {
    _id: { type: GraphQLID },
    mission: { type: GraphQLID },
  },
  resolve(parent, args) {
    return new Promise((resolve, reject) => {
      TestCaseMission.find(args, function(err, testcase) {
        err ? reject(err) : resolve(testcase);
      });
    });
  },
};

export default testCaseMissions;
