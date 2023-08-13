import {v} from 'convex/values';
import {query, mutation} from './_generated/server';

export const profilePhoto = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query('profiles')
      .filter(q => q.eq(q.field('authorId'), args.userId))
      .unique();

    return {
      _id: profile?._id,
      authorId: profile?.authorId,
      storageId: profile?.body,
      url: profile?.format === 'image' ? await ctx.storage.getUrl(profile.body) : ''
    }
  },
});

export const coverPhoto = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const cover = await ctx.db
      .query('covers')
      .filter(q => q.eq(q.field('authorId'), args.userId))
      .unique();

    return {
      _id: cover?._id,
      authorId: cover?.authorId,
      storageId: cover?.body,
      url: cover?.format === 'image' ? await ctx.storage.getUrl(cover.body) : ''
    }
  },
});

export const generateUploadUrl = mutation(async ctx => {
  return await ctx.storage.generateUploadUrl();
});

export const sendProfileImage = mutation({
  args: {storageId: v.string(), authorId: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert('profiles', {
      body: args.storageId,
      authorId: args.authorId,
      format: 'image',
    });
  },
});

export const updateProfileImage = mutation({
  args: {profileId: v.id("profiles"), storageId: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.patch(args.profileId, {
      body: args.storageId,
    });
  },
});

export const sendCoverImage = mutation({
  args: {storageId: v.string(), authorId: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.insert('covers', {
      body: args.storageId,
      authorId: args.authorId,
      format: 'image',
    });
  },
});

export const updateCoverImage = mutation({
  args: {coverId: v.id("covers"), storageId: v.string()},
  handler: async (ctx, args) => {
    await ctx.db.patch(args.coverId, {
      body: args.storageId,
    });
  },
});

export const deletePreviousImage = mutation({
  args: {storageId: v.string()},
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.storageId);
  },
});
