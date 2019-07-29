import { GraphQLNonNull, GraphQLString } from 'graphql';

import BadgeType from './type';
import Badge from './Badge';
import Course from '../Course/Course';
import { GraphQLID } from 'graphql/type/scalars';
import { GraphQLUpload } from 'graphql-upload/lib';
import { storeFB } from '../../utils/upload';

const BadgeMutation = {
  addBadge: {
    type: BadgeType,
    description: 'Add Badge',
    args: {
      title: { type: GraphQLNonNull(GraphQLString) },
      imageid: { type: GraphQLString },
    },
    resolve(root, { title, imageid }) {
      return new Promise((resolve, reject) => {
        const newbadge = new Badge({
          title,
          imageid,
        });
        newbadge.save(err => {
          err ? reject(err) : resolve(newbadge);
        });
      });
    },
  },
  updateBadge: {
    type: BadgeType,
    description: 'Update Badge',
    args: {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      image: { type: GraphQLUpload },
      course: { type: GraphQLID },
    },
    async resolve(root, { id, title, image, course }) {
      if (id) {
        const badge = await Badge.findById(id);
        badge.title = title;
        let imageid = '';
        if (image) {
          const { filename, createReadStream, mimetype } = await image;
          const stream = createReadStream();
          const filestore = await storeFB({ stream, filename, mimetype });
          imageid = filestore.id;
        }
        badge.imageid = imageid;
        return badge.save();
      }
      const badge = new Badge();
      await badge.save();
      const courseData = await Course.findById(course);
      courseData.badge = badge._id;
      courseData.save();
      return badge;
    },
  },
};

export default BadgeMutation;
