import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userRouter = createTRPCRouter({
  getCart: publicProcedure
    .input(
      z.object({
        userId: z.number(),
      })
    )
    .query(async ({ input }) => {
      const cart = await prisma.cart.findFirst({
        where: { userId: input.userId },
        include: {
          items: true,
        },
      });
      return cart;
    }),
});
