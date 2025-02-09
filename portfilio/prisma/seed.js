const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create some images first
  const image1 = await prisma.image.create({
    data: {
      src: "/Images/landscape1.jpg",
      thumbnail: "/Images/landscape1.jpg",
      alt: "A beautiful nature scene",
    },
  });

  const image2 = await prisma.image.create({
    data: {
      src: "/Images/people1.jpg",
      thumbnail: "/Images/people1.jpg",
      alt: "A busy urban scene",
    },
  });

  // Now create some tags and associate them with the images
  const tag1 = await prisma.tag.create({
    data: {
      name: "Landscape",
      description: "Nature-related images",
      thumbnail: image1.id,  // Using image1's ID after creating the image
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: "People",
      description: "Urban-related images",
      thumbnail: image2.id,  // Using image2's ID after creating the image
    },
  });

  // Associate images with tags
  await prisma.image.update({
    where: { id: image1.id },
    data: {
      tags: {
        connect: [
          { id: tag1.id }, // Associating with the 'Landscape' tag
        ],
      },
    },
  });

  await prisma.image.update({
    where: { id: image2.id },
    data: {
      tags: {
        connect: [
          { id: tag2.id }, // Associating with the 'People' tag
        ],
      },
    },
  });

  console.log("Database seeded");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
