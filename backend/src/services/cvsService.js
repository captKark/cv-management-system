const prisma = require("../lib/prisma");

const getAllCVs = async () => {
  return prisma.cV.findMany({
    include: {
      candidate: true,
      attributeValues: {
        include: {
          attribute: true,
        },
      },
    },
  });
};
const getCVById = (id) => {
  return prisma.cV.findUnique({
    where: { id },
  });
};
const createCV = async (cvData) => {
  return await prisma.$transaction(async (tx) => {
    const createdCV = await tx.cV.create({
      data: {
        candidateId: Number(cvData.candidateId),
        candidateName: cvData.candidateName,
        positionId: Number(cvData.positionId),
        positionTitle: cvData.positionTitle,
        status: cvData.status || "Draft",
        updatedAt: new Date().toISOString(),
      },
    });
    const position = await tx.position.findUnique({
      where: {
        id: Number(cvData.positionId),
      },
      include: {
        attributes: true,
      },
    });

    if (!position) {
      throw new Error("Position not found.");
    }
    if (position.attributes.length > 0) {
      await tx.cVAttributeValue.createMany({
        data: position.attributes.map((attribute) => ({
          cvId: createdCV.id,
          attributeId: attribute.attributeId,
          value: "",
        })),
      });
    }
    return await tx.cV.findUnique({
      where: {
        id: createdCV.id,
      },
      include: {
        candidate: true,
        attributeValues: {
          include: {
            attribute: true,
          },
        },
      },
    });
  });
};

const updateCV = async (id, updatedData) => {
  return await prisma.$transaction(async (tx) => {
    const existingCV = await tx.cV.findUnique({
      where: {
        id,
      },
    });

    if (!existingCV) {
      return null;
    }

    const updatedCV = await tx.cV.update({
      where: {
        id,
      },
      data: {
        candidateId: Number(updatedData.candidateId),
        candidateName: updatedData.candidateName,
        positionId: Number(updatedData.positionId),
        positionTitle: updatedData.positionTitle,
        status: updatedData.status,
        updatedAt: updatedData.updatedAt,
      },
    });

    if (existingCV.positionId !== Number(updatedData.positionId)) {
      await tx.cVAttributeValue.deleteMany({
        where: {
          cvId: id,
        },
      });

      const position = await tx.position.findUnique({
        where: {
          id: Number(updatedData.positionId),
        },
        include: {
          attributes: true,
        },
      });

      if (position.attributes.length > 0) {
        await tx.cVAttributeValue.createMany({
          data: position.attributes.map((attribute) => ({
            cvId: id,
            attributeId: attribute.attributeId,
            value: "",
          })),
        });
      }
    }

    return await tx.cV.findUnique({
      where: {
        id,
      },
      include: {
        candidate: true,
        attributeValues: {
          include: {
            attribute: true,
          },
        },
      },
    });
  });
};
const updateAttributeValues = async (cvId, values) => {
  return await prisma.$transaction(
    values.map((item) =>
      prisma.cVAttributeValue.upsert({
        where: {
          cvId_attributeId: {
            cvId,
            attributeId: item.attributeId,
          },
        },
        update: {
          value: item.value,
        },
        create: {
          cvId,
          attributeId: item.attributeId,
          value: item.value,
        },
      }),
    ),
  );
};

const deleteCVs = async (ids) => {
  const result = await prisma.cV.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return result.count;
};

module.exports = {
  getAllCVs,
  getCVById,
  createCV,
  updateCV,
  deleteCVs,
  updateAttributeValues,
};
