const jwt = require("jsonwebtoken");
const users = [
  {
    id: 1,
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
    name: "Administrator",
  },
  {
    id: 2,
    email: "recruiter@test.com",
    password: "recruit123",
    role: "recruiter",
    name: "Recruiter",
  },
  {
    id: 3,
    email: "candidate@test.com",
    password: "candidate123",
    role: "candidate",
    name: "Candidate",
  },
];

const login = (email, password) => {
  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password,
  );

  if (!user) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    },
  );

  return {
    token,
    user: userWithoutPassword,
  };
};

module.exports = {
  login,
};