/*
  Warnings:

  - Added the required column `user` to the `Macros` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Macros" (
    "user" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "food" TEXT NOT NULL,
    "protein" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL
);
INSERT INTO "new_Macros" ("calories", "date", "food", "index", "protein") SELECT "calories", "date", "food", "index", "protein" FROM "Macros";
DROP TABLE "Macros";
ALTER TABLE "new_Macros" RENAME TO "Macros";
CREATE UNIQUE INDEX "Macros_user_date_index_key" ON "Macros"("user", "date", "index");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
