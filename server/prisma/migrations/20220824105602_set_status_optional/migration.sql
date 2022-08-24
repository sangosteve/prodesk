-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status_id" TEXT;

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
