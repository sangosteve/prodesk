/*
  Warnings:

  - You are about to drop the `Comment_Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_type_id_fkey";

-- DropTable
DROP TABLE "Comment_Type";

-- CreateTable
CREATE TABLE "CommentType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CommentType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "CommentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
