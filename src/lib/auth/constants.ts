export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "Invalid email or password",
  ACCOUNT_NOT_VERIFIED: "Please verify your email address",
  SERVER_ERROR: "An error occurred. Please try again later",
} as const;

export const AUTH_ROUTES = {
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  VERIFY_EMAIL: "/auth/verify",
  RESET_PASSWORD: "/auth/reset-password",
} as const;