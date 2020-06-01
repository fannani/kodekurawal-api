import { storeFB } from '../../utils/upload';
import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Query: {
    badges: (_, args, { models }) => models.badge.find(args),
  },
  Mutation: {
    addBadge: (_, { title, imageid }, { models }) => {
      return models.badge({
        title,
        imageid,
      });
    },
    updateBadge: async (_, { id, title, image, course }, { models }) => {
      if (id) {
        const badge = await models.badge.findById(id);
        badge.title = title;
        let imageid = '';
        if (image) {
          const { filename, createReadStream, mimetype } = await image;
          const stream = createReadStream();
          const filestore: any = await storeFB({ stream, filename, mimetype });
          imageid = filestore.id;
        }
        badge.imageid = imageid;
        return badge.save();
      }
      const badge = await models.badge.create();
      const courseData = await models.course.findById(course);
      courseData.badge = badge._id;
      courseData.save();
      return badge;
    },
  },
};

export default resolvers;
