import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { InputFile, Storage } from "node-appwrite";
import { client } from "./authentication";

const storage = new Storage(client);

function isBase64(value: string): boolean {
  const base64Regex = /^data:[\w/]+;base64,([A-Za-z0-9+/]+={0,2})$/;
  return base64Regex.test(value);
}

const base64ToFile = (
  base64Data: string,
  fileName: string,
  fileType: string
) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: fileType });
  return new File([blob], fileName, { type: fileType });
};

// Example usage
const base64Data = "data:image/png;base64,iVBORw0KG...";
const fileName = "image.png";
const fileType = "image/png";

const file = base64ToFile(base64Data, fileName, fileType);
console.log(file);

export const createProductSchema = z.object({
  coverImage: z.string(),
  brand: z.string(),
  model: z.string(),
  description: z.string(),
  mrp: z.string(),
  price: z.string(),
  size: z.string(),
  lens: z.string(),
  lensColor: z.string(),
  category: z.array(z.string()),
  frameBody: z.string(),
  frameColor: z.string(),
});
export const adminRouter = createTRPCRouter({
  // PRODUCTS
  createProduct: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ input }) => {
      console.log(input.coverImage);
      return "asas";
    }),
  getAll: publicProcedure.query(async () => {
    return { nest: "asas" };
  }),
});
