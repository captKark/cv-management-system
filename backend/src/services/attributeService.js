const prisma = require("../lib/prisma");

const getAllAttributes = async () => {
  return await prisma.attribute.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const createAttribute = async (attribute) => {
  const existingAttribute = await prisma.attribute.findUnique({
    where: {
      name: attribute.name,
    },
  });

  if (existingAttribute) {
    throw new Error("Attribute name already exists.");
  }

  return await prisma.attribute.create({
    data: {
      name: attribute.name,
      category: attribute.category,
      type: attribute.type,
    },
  });
};

const updateAttribute = async (id, updatedData) => {
  const existingAttribute = await prisma.attribute.findUnique({
    where: {
      id,
    },
  });

  if (!existingAttribute) {
    return null;
  }

  const duplicate = await prisma.attribute.findFirst({
    where: {
      name: updatedData.name,
      NOT: {
        id,
      },
    },
  });

  if (duplicate) {
    throw new Error("Attribute name already exists.");
  }

  return await prisma.attribute.update({
    where: {
      id,
    },
    data: {
      name: updatedData.name,
      category: updatedData.category,
      type: updatedData.type,
    },
  });
};

const deleteAttributes = async (ids) => {
  const result = await prisma.attribute.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  return result.count;
};

module.exports = {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttributes,
};