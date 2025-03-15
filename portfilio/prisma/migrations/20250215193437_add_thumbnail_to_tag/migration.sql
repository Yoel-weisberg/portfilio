/*
  Warnings:

  - You are about to drop the `_ImageToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ImageToTag_B_index";

-- DropIndex
DROP INDEX "_ImageToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ImageToTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_TagImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TagImages_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TagImages_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Untitled Tag',
    "description" TEXT NOT NULL DEFAULT 'No description provided',
    "thumbnailId" INTEGER,
    CONSTRAINT "Tag_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Image" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tag" ("description", "id", "name") SELECT "description", "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE UNIQUE INDEX "Tag_thumbnailId_key" ON "Tag"("thumbnailId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_TagImages_AB_unique" ON "_TagImages"("A", "B");

-- CreateIndex
CREATE INDEX "_TagImages_B_index" ON "_TagImages"("B");
