const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/jwt");

const buildAuthResponse = (user) => {
  return {
    token: generateToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const createUser = async ({ name, email, password, role }) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const passwordHash = await hashPassword(password);
  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role,
    },
  });
};
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  return buildAuthResponse(user);
};

const register = async ({ name, email, password }) => {
  const user = await createUser({
    name,
    email,
    password,
    role: "candidate",
  });

  return buildAuthResponse(user);
};

const getCurrentUser = async (id) => {
  return prisma.user.findUnique({
    where: {
      id,
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
};

module.exports = {
  login,
  register,
  createUser,
  hashPassword,
  getCurrentUser,
};