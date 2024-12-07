import { type CredentialsConfig } from "next-auth/providers/credentials";
import { prisma } from "~/lib/prisma";
import { verifyPassword } from "~/lib/auth/utils";
import { AUTH_ERRORS } from "~/lib/auth/constants";

export const credentialsConfig: CredentialsConfig = {
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const user = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (!user || !user.hashedPassword) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    const isValid = await verifyPassword(credentials.password, user.hashedPassword);

    if (!isValid) {
      throw new Error(AUTH_ERRORS.INVALID_CREDENTIALS);
    }

    if (!user.verified) {
      throw new Error(AUTH_ERRORS.ACCOUNT_NOT_VERIFIED);
    }

    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
    };
  },
};