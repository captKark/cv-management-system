const cvs = [
  {
    id: 1,
    candidateName: "John Smith",
    positionId: 1,
    positionTitle: "Frontend Developer",
    status: "Draft",
    updatedAt: "2026-07-21",
  },
  {
    id: 2,
    candidateName: "Jane Doe",
    positionId: 2,
    positionTitle: "Backend Developer",
    status: "Submitted",
    updatedAt: "2026-07-20",
  },
];

const prisma = require("../lib/prisma");

const getAllCVs = async () => {
  return await prisma.cV.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const createCV = async (cvData) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Create the CV
    const createdCV = await tx.cV.create({
      data: {
        candidateName: cvData.candidateName,
        positionId: Number(cvData.positionId),
        positionTitle: cvData.positionTitle,
        status: cvData.status,
        updatedAt: new Date().toISOString(),
      },
    });

    // 2. Load the Position Template
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

    // 3. Automatically create empty attribute values
    if (position.attributes.length > 0) {
      await tx.cVAttributeValue.createMany({
        data: position.attributes.map((attribute) => ({
          cvId: createdCV.id,
          attributeId: attribute.attributeId,
          value: "",
        })),
      });
    }

    // 4. Return the generated CV with its attribute values
    return await tx.cV.findUnique({
      where: {
        id: createdCV.id,
      },
      include: {
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
  const existingCV = await prisma.cV.findUnique({
    where: {
      id,
    },
  });

  if (!existingCV) {
    return null;
  }

  return await prisma.cV.update({
    where: {
      id,
    },
    data: {
      candidateName: updatedData.candidateName,
      positionId: updatedData.positionId,
      positionTitle: updatedData.positionTitle,
      status: updatedData.status,
      updatedAt: updatedData.updatedAt,
    },
  });
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
  createCV,
  updateCV,
  deleteCVs,
};
