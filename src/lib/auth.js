// src/lib/auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const client = await clientPromise;
        const db = client.db();

        const user = await db.collection("users").findOne({ username: credentials.username });

        if (user && user.password === credentials.password) {
          return { id: user._id, name: user.username, email: user.email };
        } else {
          return null;
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default authOptions;
