
const resolvers = {
  Material: {
    content: (material, __, { db }) => db.material({ id: material.id }).content(),
  },
  Query: {
    material: async (_, { where, css }, { db }) => {
      const materials = await db.materials({
        where: {
          content: { id: where.content },
        },
      });
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
    materials: (_, __, { db }) => db.materials(),
  },
  Mutation: {
    createMaterial: (_, { input }, { db }) => db.createMaterial(input),
    updateMaterial: (_, { where, input }, { db }) => db.upsertMaterial({ update: input, where: { where }, create: input }),
    upsertMaterial: (_, { id, data }, { db }) => {
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
      return db.upsertMaterial({ update: input, where: { id }, create: input });
    },
    deleteMaterial: (_, { id }, { db }) => db.deleteMaterial({ id }),
  },
};

export default resolvers;
