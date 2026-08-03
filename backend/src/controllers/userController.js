const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search = "", role = "" } = req.query;

    const users = await userService.getUsers({
      page: Number(page),
      pageSize: Number(pageSize),
      search,
      role,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users.",
    });
  }
};

module.exports = {
  getUsers,
};
