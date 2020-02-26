import { Resolvers } from '../../generated/graphql';

const resolvers: Resolvers = {
  Material: {
    stage: (material, __, { models }) =>
      models.stage.findOne({ _id: material.stage }),
  },
  Query: {
    material: async (_, { where, css }, { models }) => {
      const materials = await models.material.find({ stage: where.stage });
      if (css) {
        materials[0].body = `<div class="container">${materials[0].body}</div>`;
        materials[0].body +=
          '<style>' +
          '.container {padding-top: 0.2em; padding-left: 1em; padding-right:1em;}' +
          'p {font-size: 3em;}' +
          'h2 {font-size: 4em;}' +
          'h3 {font-size: 3em;}' +
          'h4 {font-size: 2.5em;}' +
          '.image {width: 100%; margin-left :0px }' +
          'img {width: 100%; }' +
          '</style>';
      }
      return materials[0];
    },
    materials: (_, args, { models }) => models.material.find(args),
  },
  Mutation: {
    createMaterial: (_, { input }, { models }) => {
      return models.material.create(input);
    },
    updateMaterial: async (_, { where, input }, { models }) => {
      const material = await models.material.findById(where._id);
      material.set(input);
      return material.save();
    },
    // @ts-ignore
    upsertMaterial: (_, { id, data }, { db }) => {
      const input = {
        url: data.url,
        materialType: data.materialType,
        body: data.body,
        content: {
          connect: {
            // @ts-ignore
            id: data.content,
          },
        },
      };
      return db.upsertMaterial({ update: input, where: { id }, create: input });
    },
    deleteMaterial: (_, { id }, { models }) =>
      models.material.findByIdAndRemove(id),
  },
};

export default resolvers;
