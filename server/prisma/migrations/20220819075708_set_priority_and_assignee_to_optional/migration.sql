-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_assignee_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "priority_id" TEXT,
ALTER COLUMN "assignee_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Priority" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Priority_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Priority_description_key" ON "Priority"("description");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_assignee_id_fkey" FOREIGN KEY ("assignee_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;
