const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 5;

    const { search = "", role = "" } = req.query;

    const result = await userService.getUsers({
      page,
      pageSize,
      search,
      role,
    });

    res.status(200).json({
      users: result.users,
      total: result.total,
      totalPages: Math.ceil(result.total / pageSize),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users.",
    });
  }
};

const activateUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    await userService.activateUsers(ids);

    res.status(200).json({
      message: "Users activated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deactivateUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    await userService.deactivateUsers(ids, req.user.id);

    res.status(200).json({
      message: "Users deactivated successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createRecruiter = async (req, res) => {
  try {
    const recruiter = await userService.createRecruiter(req.body);

    res.status(201).json(recruiter);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { id, password } = req.body;

    await userService.resetPassword(id, password);

    res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to reset password.",
    });
  }
};
module.exports = {
  getUsers,
  activateUsers,
  deactivateUsers,
  createRecruiter,
  resetPassword,
};