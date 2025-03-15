import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch tags along with their associated thumbnail image
    const tags = await prisma.tag.findMany();

    // Map the result to include the thumbnail's src in the response

    return NextResponse.json(tags);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
