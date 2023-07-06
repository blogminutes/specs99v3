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
  lensColor: z.array(z.string()),
  categories: z.array(z.string()),
  frameMaterial: z.string(),
  frameColor: z.array(z.string()),
  frameType: z.string(),
  shape: z.array(z.string()),
  // gender: z.enum(["Mens", "Womens", "Unisex"]),
  images: z.array(z.string()).optional(),
  weight: z.number(),
  idealFor: z.enum(["Mens", "Womens", "Unisex", "Kids", "Girls", "Boys"]),
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
        frameMaterial,
        frameColor,
        lens,
        lensColor,
        model,
        mrp,
        price,
        size,
        images,
        shape,
        weight,
        idealFor,
        frameType,
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
          frameMaterial,
          frameColor,
          lensColor,
          images,
          shape,
          weight,
          idealFor,
          frameType,
        },
      });

      return { status: "success", product };
    }),
});
