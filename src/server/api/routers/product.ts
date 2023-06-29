import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        filters: z
          .object({
            categories: z.array(z.string()).optional(),
            limit: z.number().optional(),
            model: z.string().optional(),
            brand: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const categoriesFilter =
        input.filters?.categories && input.filters?.categories?.length > 1
          ? { categories: { hasSome: input.filters?.categories } }
          : {};

      const filters = {};
      const products = await prisma.product.findMany({
        where: {
          ...categoriesFilter,
          brand: { equals: input.filters?.brand || undefined },
          model: { equals: input.filters?.model || undefined },
        },
        take: input.filters?.limit || 12,
      });
      return { products };
    }),
  getProduct: publicProcedure
    .input(
      z.object({
        filters: z
          .object({
            model: z.string().optional(),
            brand: z.string().optional(),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findFirst({
        where: {
          brand: { equals: input.filters?.brand || undefined },
          model: { equals: input.filters?.model || undefined },
        },
      });
      return { products };
    }),
});
