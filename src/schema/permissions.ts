import { rule, shield, and, or, not } from 'graphql-shield';
//
// if (isEmpty(req.user)) throw new AuthenticationError("Must authenticate");
// const user = await users.get({ userId: req.user.id });
// return user;

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx) => {
    return ctx.req.user !== null;
  }
);

const permissions = shield({});

export default permissions;
