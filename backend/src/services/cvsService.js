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

const createCV = async (cv) => {
  return await prisma.cV.create({
    data: {
      candidateName: cv.candidateName,
      positionId: cv.positionId,
      positionTitle: cv.positionTitle,
      status: cv.status,
      updatedAt: cv.updatedAt,
    },
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
