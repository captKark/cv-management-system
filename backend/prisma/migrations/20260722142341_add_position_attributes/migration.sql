-- CreateTable
CREATE TABLE "PositionAttribute" (
    "positionId" INTEGER NOT NULL,
    "attributeId" INTEGER NOT NULL,

    CONSTRAINT "PositionAttribute_pkey" PRIMARY KEY ("positionId","attributeId")
);

-- AddForeignKey
ALTER TABLE "PositionAttribute" ADD CONSTRAINT "PositionAttribute_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionAttribute" ADD CONSTRAINT "PositionAttribute_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;
