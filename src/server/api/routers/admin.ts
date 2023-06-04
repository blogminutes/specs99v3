import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { InputFile, Storage } from "node-appwrite";
import { client } from "./authentication";

const storage = new Storage(client);

const bucketPromise = storage.createBucket("647ca61d03f8e83dcfcc", "Specs 99");

const schema = z.object({
  image: z.instanceof(File).refine((file) => file.type.startsWith("image/"), {
    message: "Invalid file format. Only images are allowed.",
  }),
});

export const adminRouter = createTRPCRouter({
  // PRODUCTS
  createProduct: publicProcedure
    .input(
      z.object({
        image: z.any(),
      })
    )
    .query(async ({ input }) => {
      // const promise = await storage.createFile("file", "[FILE_ID]", input.formData);
      // console.log(promise);
      return input.image;
    }),
  getAll: publicProcedure.query(async () => {
    return { nest: "asas" };
  }),
});
