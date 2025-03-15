-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alt" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ImageToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ImageToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ImageToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_thumbnail_key" ON "Tag"("thumbnail");

-- CreateIndex
CREATE UNIQUE INDEX "_ImageToTag_AB_unique" ON "_ImageToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ImageToTag_B_index" ON "_ImageToTag"("B");
