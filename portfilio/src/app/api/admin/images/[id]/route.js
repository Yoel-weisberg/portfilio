import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    // Get the image data from the database
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      select: { src: true, thumbnail: true },
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete the image from the database
    await prisma.image.delete({
      where: { id: parseInt(id) },
    });

    // Delete image files from the filesystem
    const publicDir = path.join(process.cwd(), "public");
    await fs.unlink(path.join(publicDir, image.src));
    await fs.unlink(path.join(publicDir, image.thumbnail));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
