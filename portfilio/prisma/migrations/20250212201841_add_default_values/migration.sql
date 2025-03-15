/*
  Warnings:

  - You are about to drop the column `src` on the `Image` table. All the data in the column will be lost.
  - Added the required column `url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alt" TEXT NOT NULL DEFAULT 'No description available',
    "url" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '/default-thumbnail.jpg',
    "width" INTEGER DEFAULT 0,
    "height" INTEGER DEFAULT 0
);
INSERT INTO "new_Image" ("alt", "height", "id", "thumbnail", "width") SELECT "alt", "height", "id", "thumbnail", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
