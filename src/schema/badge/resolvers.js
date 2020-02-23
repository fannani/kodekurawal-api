import { merge } from 'lodash';
import Badge from "../../models/Badge";
import {storeFB} from "../../utils/upload";
import Course from "../../models/Course";

const resolvers = {
  Query: {
    badges: (_, args) => Badge.find(args)
  },
  Mutation : {
    addBadge: (_, { title, imageid}) => {
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
    updateBadge: async(_,{ id, title, image, course }) => {
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
    }
  }

};

export default merge(resolvers);
