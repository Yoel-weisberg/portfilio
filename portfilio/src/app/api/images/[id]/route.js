import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, context) {
  const { params } = context; // Ensure `params` is awaited
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) },
      select: { src: true },
    });

    if (!image) {
      return new Response(JSON.stringify({ error: "Image not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(image), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
