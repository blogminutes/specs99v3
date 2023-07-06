import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
// import sendgridTransport from "nodemailer-sendgrid-transport";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

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
          cart: { create: {} },
        },
        include: {
          cart: true,
        },
      });

      console.log(process.env.SENDGRID_API_KEY);

      const res = await sgMail.send({
        to: "belivethatkg@gmail.com",
        from: "aakarsh.specs99@gmail.com",
        subject: "Signup succeeded!",
        text: "and easy to do anywhere, even with Node.js",
        html: ` <html>
        <head>
          <style>
            /* Add custom styling here */
          </style>
        </head>
        <body>
          <h1>Welcome, ${input.name}!</h1>
          <p>Thank you for signing up for our service. Please verify your email address by clicking the link below:</p>
          <a href="${"verification link"}">Verify Email</a>
          <p>If you did not sign up for this service, you can safely ignore this email.</p>
        </body>
      </html>`,
      });

      console.log(res, "SENDGRID");

      return user;
    }),
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!existingUser) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found!",
        });
      }

      const comp = bcrypt.compareSync(input?.password, existingUser.password);

      if (existingUser && !comp) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid Credentials",
        });
      }

      if (existingUser && comp) {
        return existingUser;
      }
    }),
});
