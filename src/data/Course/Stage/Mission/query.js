import { GraphQLID, GraphQLList } from 'graphql';
import MissionType from './type';
import Mission from './Mission';

const missions = {
  type: new GraphQLList(MissionType),
  description: 'List of all Mission',
  args: {
    _id: { type: GraphQLID },
    stage: { type: GraphQLID },
  },
  resolve: function(parent, args) {
    return new Promise((resolve, reject) => {
      Mission.find(args, (err, missions) => {
        err ? reject(err) : resolve(missions);
      });
    });
  },
};
export default missions;
