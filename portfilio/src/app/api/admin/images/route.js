import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { saveImage } from '@/utils/files';

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
    const imagesWithParsedTags = images.map(img => ({
      ...img,
      tags: JSON.parse(img.tags || '[]')
    }));
    
    return NextResponse.json(imagesWithParsedTags);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');
    const alt = formData.get('alt');
    const tags = JSON.parse(formData.get('tags'));
    
    const db = await getDb();
    const results = [];
    
    for (const file of files) {
      const fileName = `${Date.now()}_${file.name}`;
      const { src, thumbnail, width, height } = await saveImage(
        await file.arrayBuffer(),
        fileName
      );
      
      const result = await db.run(`
        INSERT INTO Images (src, thumbnail, alt, width, height, tags)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [src, thumbnail, alt, width, height, JSON.stringify(tags)]);
      
      results.push({
        id: result.lastID,
        src,
        thumbnail,
        alt,
        width,
        height,
        tags
      });
    }
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}