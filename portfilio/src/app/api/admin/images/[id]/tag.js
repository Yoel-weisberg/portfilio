import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { tags } = await req.json();

    // Update the tags for the image using Prisma
    const updatedImage = await prisma.image.update({
      where: { id: parseInt(id) }, // Ensure the id is parsed as an integer
      data: {
        tags: JSON.stringify(tags), // Assuming you store tags as a JSON string
      },
    });

    return NextResponse.json({ success: true, updatedImage });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
