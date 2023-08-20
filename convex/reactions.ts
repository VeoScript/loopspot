import {v} from 'convex/values';
import {query, mutation} from './_generated/server';

export const getLikesByPost = query({
  args: {
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('reactions')
      .filter(q => q.eq(q.field('postId'), args.postId))
      .collect();
  },
});

export const like = mutation({
  args: {
    postId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('reactions', {
      postId: args.postId,
      userId: args.userId,
    });
  },
});

export const unlike = mutation({
  args: {
    postId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const reactions = await ctx.db
      .query('reactions')
      .filter(q =>
        q.and(
          q.eq(q.field('postId'), args.postId),
          q.eq(q.field('userId'), args.userId),
        ),
      )
      .unique();

    if (reactions) {
      await ctx.db.delete(reactions._id);
    }
  },
});
