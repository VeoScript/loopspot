import {v} from 'convex/values';
import {query, mutation} from './_generated/server';

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl();
});

export const posts = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const posts = await ctx.db
      .query('posts')
      .filter(q => q.eq(q.field('authorId'), args.userId))
      .collect();

    return Promise.all(
      posts.map(async post => ({
        ...post,
        ...(post.format === 'image'
          ? {url: await ctx.storage.getUrl(post.storageId)}
          : {}),
      })),
    );
  },
});

export const createPost = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    article: v.string(),
    storageId: v.string(),
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('posts', {
      title: args.title,
      description: args.description,
      article: args.article,
      storageId: args.storageId,
      authorId: args.authorId,
      format: 'image',
    });
  },
});
