import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { credentialsConfig } from "~/lib/auth/providers/credentials";
import { AUTH_ROUTES } from "~/lib/auth/constants";

export const authConfig: NextAuthOptions = {
  providers: [CredentialsProvider(credentialsConfig)],
  pages: {
    signIn: AUTH_ROUTES.SIGN_IN,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};