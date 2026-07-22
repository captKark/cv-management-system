const prisma = require("../lib/prisma");

const getPositionAttributes = async (positionId) => {
  return prisma.position.findUnique({
    where: {
      id: positionId,
    },
    include: {
      attributes: {
        include: {
          attribute: true,
        },
      },
    },
  });
};

const updatePositionAttributes = async (positionId, attributeIds) => {
  await prisma.positionAttribute.deleteMany({
    where: {
      positionId,
    },
  });

  if (attributeIds.length > 0) {
    await prisma.positionAttribute.createMany({
      data: attributeIds.map((attributeId) => ({
        positionId,
        attributeId,
      })),
    });
  }

  return getPositionAttributes(positionId);
};

module.exports = {
  getPositionAttributes,
  updatePositionAttributes,
};