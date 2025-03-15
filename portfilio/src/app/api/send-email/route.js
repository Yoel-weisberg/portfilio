// app/api/send-email/route.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Reuse Prisma client instance

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json(); // Correct parsing

    const savedMessage = await prisma.emails.create({
      data: { name, email, subject, message },
    });

    return new Response(JSON.stringify(savedMessage), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
