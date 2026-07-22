const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllPositions = async () => {
  return await prisma.position.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const createPosition = async (position) => {
  return await prisma.position.create({
    data: {
      title: position.title,
      department: position.department,
      location: position.location,
      status: position.status,
    },
  });
};

const updatePosition = async (id, updatedData) => {
  const existingPosition = await prisma.position.findUnique({
    where: {
      id,
    },
  });

  if (!existingPosition) {
    return null;
  }

  return await prisma.position.update({
    where: {
      id,
    },
    data: {
      title: updatedData.title,
      department: updatedData.department,
      location: updatedData.location,
      status: updatedData.status,
    },
  });
};

const deletePositions = async (ids) => {
  const result = await prisma.position.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return result.count;
};
const duplicatePosition = async (id) => {
  const position = await prisma.position.findUnique({
    where: {
      id,
    },
  });

  if (!position) {
    return null;
  }

  return await prisma.position.create({
    data: {
      title: `${position.title} (Copy)`,
      department: position.department,
      location: position.location,
      status: position.status,
    },
  });
};
module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePositions,
  duplicatePosition,
};
