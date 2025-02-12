-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alt" TEXT NOT NULL DEFAULT 'No description available',
    "src" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '/default-thumbnail.jpg',
    "width" INTEGER DEFAULT 0,
    "height" INTEGER DEFAULT 0
);
INSERT INTO "new_Image" ("alt", "height", "id", "src", "thumbnail", "width") SELECT "alt", "height", "id", "src", "thumbnail", "width" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT 'Untitled Tag',
    "description" TEXT NOT NULL DEFAULT 'No description provided'
);
INSERT INTO "new_Tag" ("description", "id", "name") SELECT "description", "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
