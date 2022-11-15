import { publicProcedure } from "./../trpc";

import {
  createShortLinkSchema,
  getLinkSchema,
} from "@/server/schemas/shortlink.schema";
import { router } from "../trpc";
import randomStringGenerator from "@/utils/randomStringGenerator";

export const shortlinkRouter = router({
  createLink: publicProcedure
    .input(createShortLinkSchema)
    .mutation(async ({ input, ctx }) => {
      const link = await ctx.prisma.shortLink.findFirst({
        where: {
          url: input.url,
        },
      });

      if (link) {
        throw Error(`Link already exists for ${input.url}`);
      }

      const shortlink = await ctx.prisma.shortLink.create({
        data: {
          url: input.url,
          slug: randomStringGenerator(8),
        },
      });
      return shortlink;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shortLink.findMany({});
  }),
  getLink: publicProcedure.input(getLinkSchema).query(({ ctx, input }) => {
    return ctx.prisma.shortLink.findFirst({
      where: {
        slug: input.slug,
      },
    });
  }),
});
