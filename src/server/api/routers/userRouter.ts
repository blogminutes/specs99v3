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
          items: { include: { product: true } },
        },
      });
      return cart;
    }),
  addToCart: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        productId: z.number(),
        quantity: z.number(),
      })
    )
    .query(async ({ input }) => {
      const newCartProduct = await prisma.cartProduct.create({
        data: {
          cart: { connect: { id: input.cartId } },
          product: { connect: { id: input.productId } },
          quantity: input.quantity,
        },
      });
      return newCartProduct;
    }),
});
