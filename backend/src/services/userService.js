const prisma = require("../lib/prisma");

const buildWhereClause = (search, role) => {
  const where = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (role) {
    where.role = role;
  }

  return where;
};

const getUsers = async ({
  page,
  pageSize,
  search,
  role,
}) => {
  const where = buildWhereClause(search, role);

  const users = await prisma.user.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where,
  });

  return {
    users,
    total,
  };
};

module.exports = {
  getUsers,
};