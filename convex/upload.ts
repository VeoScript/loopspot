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
      url: profile?.format === 'image' ? await ctx.storage.getUrl(profile.body) : ''
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
