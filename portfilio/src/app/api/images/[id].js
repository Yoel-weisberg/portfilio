import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid or missing ID" });
  }

  try {
    // Find the image by ID
    const image = await prisma.image.findUnique({
      where: { id: parseInt(id) }, // Convert id to number if it's stored as an integer
      select: { src: true }, // Select only the 'src' attribute
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    return res.status(200).json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
