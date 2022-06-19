import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!, // process.env.NODE_ENV 이용해서 조건문 넣고 Live Site 넣어야 할수도.
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more oauth provider here
  ],
  adapter: MongoDBAdapter(clientPromise),
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 3 * 60 * 60, // 3 hours
  // },
  // callbacks: {
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       token.accessToken = user.token
  //     }

  //     return token;
  //   },
  //   session: async ({ session, token }) => {
  //     if (token) {
  //       session.accessToken = token.accessToken;
  //     }
  //     return session;
  //   }
  // },
});