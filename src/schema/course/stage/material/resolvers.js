import Material from './Material';
import Stage from '../Stage';

const resolvers = {
  Material: {
    stage: (material, __, ) => Stage.findOne({ _id: material.stage }),
  },
  Query: {
    material: async (_, { where, css }) => {
      const materials = await Material.find({ stage : where.stage });
      if (css) {
        materials[0].body = `<div class="container">${materials[0].body}</div>`;
        materials[0].body += '<style>'
          + '.container {padding-top: 0.2em; padding-left: 1em; padding-right:1em;}'
          + 'p {font-size: 3em;}'
          + 'h2 {font-size: 4em;}'
          + 'h3 {font-size: 3em;}'
          + 'h4 {font-size: 2.5em;}'
          + '.image {width: 100%; margin-left :0px }'
          + 'img {width: 100%; }'
          + '</style>';
      }
      return materials[0];
    },
    materials: (_, args ) => Material.find(args),
  },
  Mutation: {
    createMaterial: (_, {input}) => {
      const material = new Material(input);
      return material.save();
    },
    updateMaterial: async (_, {where, input}) => {
      const material = await Material.findById(where._id);
      material.set(input);
      return material.save();
    },
    upsertMaterial: (_, {id, data}, {db}) => {
      const input = {
        url: data.url,
        materialType: data.materialType,
        body: data.body,
        content: {
          connect: {
            id: data.content,
          },
        },
      };
      return db.upsertMaterial({update: input, where: {id}, create: input});
    },
    deleteMaterial: (_, {id}) => Material.findByIdAndRemove(id)
  }
};

export default resolvers;
