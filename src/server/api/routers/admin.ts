import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { client } from "~/server/square";

const { locationsApi } = client;

export const adminRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async () => {
    return await locationsApi.listLocations();
  }),
});
