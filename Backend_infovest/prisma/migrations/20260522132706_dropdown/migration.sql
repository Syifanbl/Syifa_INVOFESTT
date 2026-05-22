-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "pembicara_Id" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "pembicaras" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pembicara_Id_fkey" FOREIGN KEY ("pembicara_Id") REFERENCES "pembicaras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
