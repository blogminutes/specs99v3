import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const WhereFilterString = z.object({
  contains: z.string().optional(),
  equals: z.string().optional(),
  not: z.string().optional(),
  notIn: z.array(z.string()).optional(),
});

const WhereFilterArray = z.object({
  equals: z.array(z.string()).optional(),
});

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        filters: z
          .object({
            categories: WhereFilterArray.optional(),
            limit: z.number().optional(),
            model: WhereFilterString.optional(),
            brand: WhereFilterString.optional(),
            shape: WhereFilterString.optional(),
          })
          .optional(),
      })
    )
    .query(async ({ input }) => {
      const products = await prisma.product.findMany({
        where: {
          categories: input.filters?.categories,
          brand: input.filters?.brand,
          model: input.filters?.model,
          shape: input.filters?.shape,
        },
        orderBy: { createdAt: "desc" },
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
