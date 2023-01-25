import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prisma/prismaClient";

const emails = process.env.AUTHORIZED_EMAILS;

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && emails.includes(profile.email); // return only `email_verified` google account.
      }
      return true; // Do different verification for other providers that don't have `email_verified`.
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt", // JSON Web Token
  },
};

export default NextAuth(authOptions);
