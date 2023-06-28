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
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          categories: { hasSome: input.filters?.categories || [] },
        },
        take: input.filters?.limit || 12,
      });
      return { products };
    }),
});
