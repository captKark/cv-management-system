const prisma = require("../lib/prisma");
const { createUser, hashPassword } = require("./authService");
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

const updateUsersStatus = async (ids, isActive, currentUserId) => {
  if (!isActive && ids.includes(currentUserId)) {
    throw new Error("You cannot deactivate your own account.");
  }
  await prisma.user.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      isActive,
    },
  });
};
const activateUsers = async (ids) => {
  return updateUsersStatus(ids, true);
};

const deactivateUsers = async (ids, currentUserId) => {
  return updateUsersStatus(ids, false, currentUserId);
};
const getUsers = async ({ page, pageSize, search, role }) => {
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
const createRecruiter = async ({ name, email, password }) => {
  return createUser({
    name,
    email,
    password,
    role: "recruiter",
  });
};

const resetPassword = async (id, password) => {
  const passwordHash = await hashPassword(password);

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      passwordHash,
    },
  });
};
module.exports = {
  getUsers,
  activateUsers,
  deactivateUsers,
  createRecruiter,
  resetPassword,
};
