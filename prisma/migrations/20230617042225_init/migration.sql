-- CreateTable
CREATE TABLE "Macros" (
    "date" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "food" TEXT NOT NULL,
    "protein" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Macros_date_index_key" ON "Macros"("date", "index");
