import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        submissionId: z.string(),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          submissionId: input.submissionId,
          userId: ctx.session.user.id,
        },
      });
    }),

  getBySubmission: protectedProcedure
    .input(z.object({ submissionId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.comment.findMany({
        where: { submissionId: input.submissionId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    }),
});