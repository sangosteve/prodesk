/*
  Warnings:

  - Added the required column `type_id` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "type_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Comment_Type" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Comment_Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Comment_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
