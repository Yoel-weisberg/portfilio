import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false
  }
};

export async function GET() {
  try {
    const prisma = new PrismaClient();
    const images = await prisma.image.findMany({
      include: { tags: true }, // Fetches related tags for each image
    });
    
    
    // Parse tags from JSON string
    console.log(images[0].tags)
    const imagesWithTags = images.map(img => ({
      ...img,
      // If `tags` is a JSON string, you can use JSON.parse() here.
      // tags: JSON.parse(img.tags || '[]'), 
      tags: img.tags.map(tag => tag.id), // Directly return tags if it's already an object/array
    }));
    
    return NextResponse.json(imagesWithTags);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
