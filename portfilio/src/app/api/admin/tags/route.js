import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Get the request body
    const { name, description, thumbnailId } = await req.json();

    // Create a new tag in the database using Prisma
    const newTag = await prisma.tag.create({
      data: {
        name,
        description,
        thumbnail: thumbnailId, // Assuming thumbnailId is the ID of the image
      },
    });

    return NextResponse.json({
      id: newTag.id,
      name: newTag.name,
      description: newTag.description,
      thumbnail: newTag.thumbnail,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
