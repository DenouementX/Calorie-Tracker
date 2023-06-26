-- CreateTable
CREATE TABLE "Macros" (
    "user" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "food" TEXT NOT NULL,
    "protein" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Macros_user_date_index_key" ON "Macros"("user", "date", "index");
