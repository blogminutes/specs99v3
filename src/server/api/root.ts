import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "~/server/api/routers/admin";
import { authenticationRouter } from "./routers/authentication";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  authentication: authenticationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
