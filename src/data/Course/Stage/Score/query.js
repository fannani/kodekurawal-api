import { GraphQLID, GraphQLList } from 'graphql';
import ScoreType from './type';
import Score from './Score';

const scores = {
  type: new GraphQLList(ScoreType),
  description: 'List of all Score',
  args: {
    player: { type: GraphQLID },
  },
  resolve(parent,args) {
    return new Promise((resolve,reject)=>{
      Score.find(args,function(err, missions) {
        err ? reject(err) : resolve(missions)
      })
    })
  },
};
export default scores;
