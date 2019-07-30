import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from 'graphql';

import Video from './Video';

const VideoType = new GraphQLObjectType({
  name: 'Video',
  description: 'This represent an video',
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    videoid: { type: GraphQLString },
    updated_at: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default VideoType;
