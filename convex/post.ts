import {v} from 'convex/values';
import {query, mutation} from './_generated/server';
import {paginationOptsValidator} from 'convex/server';

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl();
});

export const useGetPostImages = query({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const post = query({
  args: {
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query('posts')
      .filter(q => q.eq(q.field('_id'), args.postId))
      .unique();

    return {
      _id: post?._id,
      _creationTime: post?._creationTime,
      title: post?.title,
      description: post?.description,
      article: post?.article,
      authorId: post?.authorId,
      url:
        post?.format === 'image'
          ? await ctx.storage.getUrl(post.storageId)
          : '',
    };
  },
});

export const posts = query({
  args: {paginationOpts: paginationOptsValidator},
  handler: async (ctx, args) => {
    return await ctx.db
      .query('posts')
      .order('desc')
      .paginate(args.paginationOpts);
  },
});

export const userPosts = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('posts')
      .filter(q => q.eq(q.field('authorId'), args.userId))
      .order('desc')
      .paginate(args.paginationOpts);
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

export const editPost = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    article: v.string(),
    storageId: v.string(),
    authorId: v.string(),
    postId: v.id('posts'),
    postImageUrl: v.boolean(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query('posts')
      .filter(q => q.eq(q.field('_id'), args.postId))
      .unique();

    if (post) {
      if (args.postImageUrl) {
        // update post data except image url...
        await ctx.db.patch(post._id, {
          title: args.title,
          description: args.description,
          article: args.article,
          authorId: args.authorId,
        });
      } else {
        // delete existing image url in storage...
        await ctx.storage.delete(post.storageId);

        // update new post data with image url...
        await ctx.db.patch(post._id, {
          title: args.title,
          description: args.description,
          article: args.article,
          storageId: args.storageId,
          authorId: args.authorId,
        });
      }
    }
  },
});

export const deletePost = mutation({
  args: {
    postId: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query('posts')
      .filter(q => q.eq(q.field('_id'), args.postId))
      .order('desc')
      .unique();

    const reactions = await ctx.db
      .query('reactions')
      .filter(q => q.eq(q.field('postId'), args.postId))
      .collect();

    // DELETE POST AND POST IMAGE IN FILE STORAGE...
    if (post) {
      await ctx.db.delete(post._id);
      await ctx.storage.delete(post.storageId);
    }

    // DELETE POST IN REACTIONS/INSPIRED POSTS...
    if (reactions) {
      for (let i = 0; i < reactions.length; i++) {
        await ctx.db.delete(reactions[i]._id);
      }
    }
  },
});
