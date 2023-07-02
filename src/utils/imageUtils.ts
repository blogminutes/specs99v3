import sharp from "sharp";

export async function resizeImage(
  imageBuffer: Buffer,
  width: number,
  height: number
): Promise<Buffer> {
  const resizedImageBuffer = await sharp(imageBuffer)
    .resize(width, height)
    .toBuffer();

  return resizedImageBuffer;
}
