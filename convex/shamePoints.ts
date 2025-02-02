import { query } from "./_generated/server";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("shamePoints").collect();
  },
});

export const addPersonToShame = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("shamePoints", { name: args.name, shameCount: 0.0 });
  },
});

export const deletePerson = mutation({
  args: { id: v.id("shamePoints") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// export const updateShamePoints = mutation({
//   args: { id: v.id("shamePoints") },
//   handler: async (ctx, args) => {
//   },
// });