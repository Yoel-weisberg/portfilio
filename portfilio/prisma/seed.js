const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Create some images first
  const image1 = await prisma.image.create({
    data: {
      src: "/Images/landscape1.jpg",
      thumbnail: "/Images/landscape1.jpg",  // Thumbnail is directly assigned
      alt: "A beautiful nature scene",
      width: 800,
      height: 600
    },
  });

  const image2 = await prisma.image.create({
    data: {
      src: "/Images/people1.jpg",
      thumbnail: "/Images/people1.jpg",  // Thumbnail is directly assigned
      alt: "A busy urban scene",
      width: 800,
      height: 600
    },
  });

  // Now create some tags and associate them with the images
  const tag1 = await prisma.tag.create({
    data: {
      name: "Landscape",
      description: "Nature-related images",
      thumbnail: { connect: { id: image1.id } },  // Connect image1 as the thumbnail
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      name: "People",
      description: "Urban-related images",
      thumbnail: { connect: { id: image2.id } },  // Connect image2 as the thumbnail
    },
  });

  // Associate images with tags (many-to-many relation)
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

}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
