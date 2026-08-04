const prisma = require("../lib/prisma");

const getProfile = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      cvs: {
        orderBy: {
          id: "desc",
        },
        select: {
          id: true,
          positionId: true,
          positionTitle: true,
          status: true,
          updatedAt: true,
        },
      },
    },
  });
};

module.exports = {
  getProfile,
};