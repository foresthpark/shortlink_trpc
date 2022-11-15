import { shortlinkRouter } from "./shortlink";
import { router } from "../trpc";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  shortlink: shortlinkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
