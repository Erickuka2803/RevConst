import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { submissionRouter } from "./routers/submission";
import { commentRouter } from "./routers/comment";
import { analyticsRouter } from "./routers/analytics";
import { adminRouter } from "./routers/admin";
import { notificationRouter } from "./routers/notification";

export const appRouter = createTRPCRouter({
  user: userRouter,
  submission: submissionRouter,
  comment: commentRouter,
  analytics: analyticsRouter,
  admin: adminRouter,
  notification: notificationRouter,
});

export type AppRouter = typeof appRouter;