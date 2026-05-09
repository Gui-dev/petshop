/*
  Warnings:

  - You are about to drop the column `schedule_at` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `scheduled_at` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "schedule_at",
ADD COLUMN     "scheduled_at" TIMESTAMP(3) NOT NULL;
