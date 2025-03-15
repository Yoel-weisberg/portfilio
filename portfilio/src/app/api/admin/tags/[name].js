import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { name } = params;
    const { description, thumbnailId } = await req.json();

    // Update the tag using Prisma
    const updatedTag = await prisma.tag.update({
      where: { name },
      data: {
        description,
        thumbnailId, // Assuming thumbnailId is the ID of the image
      },
    });

    return NextResponse.json({ success: true, updatedTag });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { name } = params;

    // Remove the tag from all images
    const images = await prisma.image.findMany({
      where: {
        tags: {
          has: name, // Check if the image's tags include the name
        },
      },
    });

    // Update all images by removing the tag
    for (const image of images) {
      const updatedTags = image.tags.filter((tag) => tag !== name);
      await prisma.image.update({
        where: { id: image.id },
        data: { tags: updatedTags },
      });
    }

    // Delete the tag
    await prisma.tag.delete({
      where: { name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
