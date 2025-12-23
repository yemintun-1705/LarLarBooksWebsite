import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import { supabase } from "./supabase";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailOrUsername: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrUsername || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Determine if input is email or username
        const isEmail = credentials.emailOrUsername.includes("@");
        let email: string;

        if (isEmail) {
          // If it's an email, use it directly
          email = credentials.emailOrUsername;
        } else {
          // If it's a username, look up the email from Profile
          const profileByUsername = await prisma.profile.findUnique({
            where: {
              username: credentials.emailOrUsername,
            },
            select: {
              email: true,
            },
          });

          if (!profileByUsername || !profileByUsername.email) {
            throw new Error("Invalid credentials");
          }

          email = profileByUsername.email;
        }

        // Authenticate with Supabase Auth using the email
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: email,
          password: credentials.password,
        });

        if (authError || !authData.user) {
          throw new Error("Invalid credentials");
        }

        // Get profile data
        const profile = await prisma.profile.findUnique({
          where: {
            id: authData.user.id,
          },
        });

        if (!profile) {
          throw new Error("Profile not found");
        }

        return {
          id: profile.id,
          email: profile.email || "",
          name: profile.fullName || profile.username || "",
          image: profile.avatarUrl || "",
        };
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
};
