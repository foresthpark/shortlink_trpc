import z from "zod";

export const createShortLinkSchema = z.object({
  url: z.string().url(),
});

export type createShortlinkInput = z.TypeOf<typeof createShortLinkSchema>;

export const getUrlSchema = z.object({
  slug: z.string().nullish(),
});

export type getUrlInput = z.TypeOf<typeof getUrlSchema>;

// export const getPostByIdSchema = z.object({
//   postId: z.number(),
// });

// export type GetPostByIdInput = z.TypeOf<typeof getPostByIdSchema>;

// export const addCommentSchema = z.object({
//   postId: z.number(),
//   content: z.string().min(5),
//   userId: z.string().nullish(),
// });

// export type AddCommentInput = z.TypeOf<typeof addCommentSchema>;
