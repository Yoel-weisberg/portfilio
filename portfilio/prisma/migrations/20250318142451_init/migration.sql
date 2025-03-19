-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "alt" TEXT NOT NULL DEFAULT 'No description available',
    "src" TEXT NOT NULL DEFAULT 'No description available',
    "thumbnail" TEXT NOT NULL DEFAULT '/default-thumbnail.jpg',
    "width" INTEGER DEFAULT 0,
    "height" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Untitled Tag',
    "description" TEXT NOT NULL DEFAULT 'No description provided',
    "thumbnailId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emails" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isHandled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TagImages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_thumbnailId_key" ON "Tag"("thumbnailId");

-- CreateIndex
CREATE INDEX "_TagImages_B_index" ON "_TagImages"("B");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagImages" ADD CONSTRAINT "_TagImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagImages" ADD CONSTRAINT "_TagImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
