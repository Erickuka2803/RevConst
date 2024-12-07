import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        surname: z.string().optional(),
        email: z.string().email(),
        profession: z.string(),
        education: z.string(),
        age: z.number().min(18),
        village: z.string().optional(),
        town: z.string(),
        territory: z.string(),
        province: z.string(),
        country: z.string(),
        region: z.string(),
        nationalId: z.string().optional(),
        voterRegId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: input,
      });
    }),

  getProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
});