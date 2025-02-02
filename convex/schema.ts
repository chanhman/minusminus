import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  shamePoints: defineTable({
    name: v.string(),
    shameCount: v.number(),
  }),
});