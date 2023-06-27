import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        filters: z.object({ category: z.string().optional() }).optional(),
      })
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          categories: { has: "Sunglasses" },
        },
      });
      return { products };
    }),
});
