-- CreateTable
CREATE TABLE "CVAttributeValue" (
    "id" SERIAL NOT NULL,
    "cvId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CVAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CVAttributeValue_cvId_attributeId_key" ON "CVAttributeValue"("cvId", "attributeId");

-- AddForeignKey
ALTER TABLE "CVAttributeValue" ADD CONSTRAINT "CVAttributeValue_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CV"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CVAttributeValue" ADD CONSTRAINT "CVAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
