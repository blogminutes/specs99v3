import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";

export const authenticationRouter = createTRPCRouter({
  "sign-up": publicProcedure
    .input(
      z.object({ email: z.string(), password: z.string(), name: z.string() })
    )
    .query(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User already exist.",
        });
      }

      const hashedPassword = bcrypt.hashSync(input.password, 10);

      const user = await prisma.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
        },
      });

      return user;
    }),
});
