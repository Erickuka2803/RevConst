import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { submissionSchema } from "~/lib/utils/validation";
import { SUBMISSION_STATUS } from "~/lib/constants";

export const submissionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(submissionSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.submission.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
          status: SUBMISSION_STATUS.PENDING,
        },
      });
    }),

  getUserSubmissions: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.submission.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.submission.findUnique({
        where: { id: input.id },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
    }),
});