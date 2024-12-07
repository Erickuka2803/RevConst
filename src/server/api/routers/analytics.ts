import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const analyticsRouter = createTRPCRouter({
  getSubmissionStats: protectedProcedure.query(async ({ ctx }) => {
    const [
      totalSubmissions,
      submissionsByStatus,
      submissionsByTheme,
      submissionsByProvince,
      submissionsByAge,
      submissionsByEducation,
    ] = await Promise.all([
      ctx.prisma.submission.count(),
      ctx.prisma.submission.groupBy({
        by: ["status"],
        _count: true,
      }),
      ctx.prisma.submission.groupBy({
        by: ["theme"],
        _count: true,
      }),
      ctx.prisma.user.groupBy({
        by: ["province"],
        _count: {
          submissions: true,
        },
      }),
      ctx.prisma.user.groupBy({
        by: ["age"],
        _count: {
          submissions: true,
        },
      }),
      ctx.prisma.user.groupBy({
        by: ["education"],
        _count: {
          submissions: true,
        },
      }),
    ]);

    return {
      totalSubmissions,
      statusDistribution: Object.fromEntries(
        submissionsByStatus.map((item) => [item.status, item._count])
      ),
      themeDistribution: Object.fromEntries(
        submissionsByTheme.map((item) => [item.theme, item._count])
      ),
      provinceDistribution: Object.fromEntries(
        submissionsByProvince.map((item) => [item.province, item._count.submissions])
      ),
      ageDistribution: Object.fromEntries(
        submissionsByAge.map((item) => [item.age, item._count.submissions])
      ),
      educationDistribution: Object.fromEntries(
        submissionsByEducation.map((item) => [item.education, item._count.submissions])
      ),
    };
  }),

  getSubmissionTrends: protectedProcedure.query(async ({ ctx }) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const submissions = await ctx.prisma.submission.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        createdAt: true,
        status: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const dailySubmissions = submissions.reduce((acc, submission) => {
      const date = submission.createdAt.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      dailySubmissions,
    };
  }),
});