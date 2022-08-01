/*
  Warnings:

  - Made the column `assignee_id` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignee_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "assignee_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
