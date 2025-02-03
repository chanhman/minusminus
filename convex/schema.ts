import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  shamePoints: defineTable({
    name: v.string(),
    shameCount: v.number(),
  }),
});