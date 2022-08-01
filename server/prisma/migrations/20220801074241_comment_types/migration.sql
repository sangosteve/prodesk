/*
  Warnings:

  - Added the required column `c_type_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "c_type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Ctype" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Ctype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_c_type_id_fkey" FOREIGN KEY ("c_type_id") REFERENCES "Ctype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
