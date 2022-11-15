import z from "zod";

export const createShortLinkSchema = z.object({
  url: z.string().url(),
});

export type createShortlinkInput = z.TypeOf<typeof createShortLinkSchema>;

export const getLinkSchema = z.object({
  slug: z.string(),
});

export type getLinkInput = z.TypeOf<typeof getLinkSchema>;
