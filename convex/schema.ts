import {defineSchema, defineTable} from 'convex/server';
import {v} from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.string() && v.null(),
    email: v.string(),
    password: v.string(),
  }),
  profiles: defineTable({
    body: v.string(),
    authorId: v.string(),
    format: v.string(),
  }),
});
