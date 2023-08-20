import {v} from 'convex/values';
import {query, mutation} from './_generated/server';
import {paginationOptsValidator} from 'convex/server';

export const inboxes = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('inbox')
      .filter(q =>
        q.or(
          q.eq(q.field('receiverId'), args.userId),
          q.eq(q.field('senderId'), args.userId),
        ),
      )
      .order('desc')
      .paginate(args.paginationOpts);
  },
});

export const messages = query({
  args: {
    inboxId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('messages')
      .filter(q => q.eq(q.field('inboxId'), args.inboxId))
      .order('desc')
      .paginate(args.paginationOpts);
  },
});

export const createInbox = mutation({
  args: {
    last_chat: v.string(),
    senderId: v.string(),
    receiverId: v.string(),
  },
  handler: async (ctx, args) => {
    const inbox = await ctx.db
      .query('inbox')
      .filter(q =>
        q.or(
          q.eq(q.field('senderId'), args.receiverId),
          q.eq(q.field('senderId'), args.senderId),
        ),
      )
      .unique();

    // kung naa nay existing inbox, no need na para mag create syag new...
    if (inbox) {
      return {
        inboxId: inbox._id,
      };
    }

    // kung wala pa silay inbox, mag create ug inbox para sa ilang convo...
    const inboxId = await ctx.db.insert('inbox', {
      last_chat: args.last_chat ?? '',
      senderId: args.senderId,
      receiverId: args.receiverId,
    });

    return {
      inboxId,
    };
  },
});

export const deleteInbox = mutation({
  args: {
    inboxId: v.id('inbox'),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query('messages')
      .filter(q => q.eq(q.field('inboxId'), args.inboxId))
      .collect();

    await ctx.db.delete(args.inboxId);

    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        await ctx.db.delete(messages[i]._id);
      }
    }
  },
});

export const sendMessage = mutation({
  args: {
    chat: v.string(),
    senderId: v.string(),
    receiverId: v.string(),
    inboxId: v.id('inbox'),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.inboxId, {
      last_chat: args.chat,
      senderId: args.senderId,
      receiverId: args.receiverId,
    });

    await ctx.db.insert('messages', {
      chat: args.chat,
      senderId: args.senderId,
      receiverId: args.receiverId,
      inboxId: args.inboxId,
    });
  },
});
