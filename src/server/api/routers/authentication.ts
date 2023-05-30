import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import sdk, { ID, Account } from "node-appwrite";
// Init SDK
const client = new sdk.Client();

const users = new sdk.Users(client);

const account = new sdk.Account(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("64751786b57ca0d8e835") // Your project ID
  .setKey(
    "dea778cbfcccc240752f5960652b3d05ac9b6f4dcef9c13e5da3a32cd377728f9f93332b8110246260e1acfc901d6088de52b023921f013e812f6c17234fe97ef5577d3f3af835486c537df6f39e73619c19ccfaeb5a537a87aa31dd99d6f848a9b81c0ac789c730a5ba177f18b85586247c5436da9c87892fd76ae4bfdc0f4e"
  ); // Your secret API key

export const authenticationRouter = createTRPCRouter({
  "sign-up": publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input }) => {
      const promise = await users.create(
        ID.unique(),
        input.email,
        undefined,
        input.password
      );

      return promise;
    }),
  "sign-in": publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .query(async ({ input }) => {
      const promise = await account.get();

      return promise;
    }),
});
