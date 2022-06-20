import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

const isDev = (process.env.NODE_ENV === 'development') ? true : false;

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: (isDev) ? process.env.GITHUB_ID_DEV! : process.env.GITHUB_ID_PROD!,
      clientSecret: (isDev) ? process.env.GITHUB_SECRET_DEV! : process.env.GITHUB_SECRET_PROD!,
    }),
    GoogleProvider({
      clientId: (isDev) ? process.env.GOOGLE_ID_DEV! : process.env.GOOGLE_ID_PROD!,
      clientSecret: (isDev) ? process.env.GOOGLE_SECRET_DEV! : process.env.GOOGLE_SECRET_PROD!,
    }),
    // ...Add more oauth provider here
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