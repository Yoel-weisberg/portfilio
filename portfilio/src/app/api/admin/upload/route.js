import { writeFile } from "fs/promises";
import { join } from "path";
import sizeOf from "image-size";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {

  try {
    const { images } = await req.json();

    if (!images || images.length === 0) {
      return new Response(JSON.stringify({ error: "No images provided" }), {
        status: 400,
      });
    }

    const uploadedImages = [];

    for (const { name, data } of images) {
      const buffer = Buffer.from(data, "base64");

      // Define file path
      const filePath = join(process.cwd(), "public/uploads", name);
      await writeFile(filePath, buffer);

      // Get image dimensions
      const { width, height } = sizeOf(buffer);

      // Save to Prisma
      const savedImage = await prisma.image.create({
        data: {
          src: `/uploads/${name}`,
          width,
          height,
          createdAt: new Date(), // Store current timestamp
        },
      });

      uploadedImages.push(savedImage);
    }

    return new Response(JSON.stringify(uploadedImages), { status: 200 });
  } catch (error) {
    console.error("Error uploading images:", error);
    return new Response(JSON.stringify({ error: "Failed to upload images" }), {
      status: 500,
    });
  }
}
