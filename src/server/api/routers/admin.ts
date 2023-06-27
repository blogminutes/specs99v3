import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProductSchema = z.object({
  coverImage: z.string(),
  brand: z.string(),
  model: z.string(),
  description: z.string(),
  mrp: z.number(),
  price: z.number(),
  size: z.string(),
  lens: z.string(),
  lensColor: z.string(),
  categories: z.array(z.string()),
  frameBody: z.string(),
  frameColor: z.string(),
  shape: z.string(),
  gender: z.enum(["Mens", "Womens", "Unisex"]),
  images: z.array(z.string()).optional(),
});
export const adminRouter = createTRPCRouter({
  // PRODUCTS
  createProduct: publicProcedure
    .input(createProductSchema)
    .query(async ({ input }) => {
      const {
        brand,
        categories,
        coverImage,
        description,
        frameBody,
        frameColor,
        lens,
        lensColor,
        model,
        mrp,
        price,
        size,
        images,
        gender,
        shape,
      } = input;

      const product = await prisma.product.create({
        data: {
          brand,
          model,
          description,
          mrp,
          price,
          categories,
          size,
          lens,
          coverImage,
          frameBody,
          frameColor,
          lensColor,
          images,
          gender,
          shape,
        },
      });

      return { status: "success", product };
    }),
});
