import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const createProductSchema = z.object({
  coverImage: z.string(),
  brand: z.string(),
  model: z.string(),
  description: z.string(),
  mrp: z.string(),
  price: z.string(),
  size: z.string(),
  lens: z.string(),
  lensColor: z.string(),
  category: z.array(z.string()),
  frameBody: z.string(),
  frameColor: z.string(),
});
export const adminRouter = createTRPCRouter({
  // PRODUCTS
  createProduct: publicProcedure
    .input(createProductSchema)
    .mutation(({ input }) => {
      console.log(input.coverImage);
      return "asas";
    }),
  getAll: publicProcedure.query(() => {
    return { nest: "asas" };
  }),
});
