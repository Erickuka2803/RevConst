import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  getSubmissions: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return ctx.prisma.submission.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  updateSubmissionStatus: protectedProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return ctx.prisma.submission.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),
});