import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { tags } = await req.json();

    // Check if tags are already assigned to the image
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      include: { tags: true }, // Include existing tags for comparison
    });

    // Get the existing tags associated with the image
    const existingTags = image?.tags.map((tag) => tag.id) || [];

    // Filter out the tags that are already associated with the image
    const newTags = tags.filter((tagId) => !existingTags.includes(tagId));

    if (newTags.length > 0) {
      // Add new tags to the image (avoiding duplicates)
      await prisma.image.update({
        where: { id: parseInt(id) },
        data: {
          tags: {
            connect: newTags.map((tagId) => ({ id: tagId })),
          },
        },
      });
    }

    // Optionally, you can fetch the updated image to return it
    const updatedImage = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      include: { tags: true },
    });

    return NextResponse.json({ success: true, updatedImage });
  } catch (error) {
    console.error('Error updating image tags:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
