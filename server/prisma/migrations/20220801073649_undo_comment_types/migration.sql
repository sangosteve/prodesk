/*
  Warnings:

  - You are about to drop the column `type_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `CommentType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_type_id_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "type_id";

-- DropTable
DROP TABLE "CommentType";
