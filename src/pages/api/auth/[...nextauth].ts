import NextAuth, { Awaitable, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "~/server/db";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

const options: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) {
          throw new Error("User not found!");
        }
        if (
          user &&
          credentials?.password &&
          bcrypt.compareSync(credentials?.password, user.password)
        ) {
          return { ...user, id: String(user.id) };
        } else throw new Error("Invalid Credentials!");
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (!session.user) {
        return {
          ...session,
        };
      }

      const userData = await prisma.user.findUnique({
        where: { email: session?.user?.email },
        include: {
          cart: { include: { items: { include: { product: true } } } },
        },
      });

      return {
        ...session,
        user: {
          email: userData?.email,
          id: userData?.id,
          name: userData?.name,
          role: userData?.role,
          cart: userData?.cart,
        },
      };
    },
  },
};

export default NextAuth(options);
