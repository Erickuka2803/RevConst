import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { NOTIFICATION_TYPES } from "~/lib/constants/notification-types";

export const notificationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.notification.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  markAsRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.notification.update({
        where: { id: input.id },
        data: { read: true },
      });
    }),

  markAllAsRead: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.notification.updateMany({
      where: { userId: ctx.session.user.id, read: false },
      data: { read: true },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        type: z.enum([
          NOTIFICATION_TYPES.SUBMISSION_STATUS,
          NOTIFICATION_TYPES.COMMENT,
          NOTIFICATION_TYPES.SYSTEM,
        ]),
        title: z.string(),
        message: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.notification.create({
        data: input,
      });
    }),
});