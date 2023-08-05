import {query, mutation} from './_generated/server';
import {v} from 'convex/values';

export const user = query({
  args: {
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user;
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .filter(q => q.eq(q.field('email'), args.email))
      .collect();

    if (!user[0]) {
      return ([{
        status: 400,
        message: 'Account not found!'
      }]);
    }

    if (user[0].password !== args.password) {
      return ([{
        status: 400,
        message: 'Password is incorrect!'
      }]);
    }

    return user;
  },
});

export const register = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert('users', {
      name: args.name,
      email: args.email,
      password: args.password,
    });

    return userId;
  },
});
