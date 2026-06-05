const {
  getAllUsers,
  getUserById,
  getAgents,
  updateUserStatus,
} = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/response");

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    return successResponse(res, 200, "Users fetched", users);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    return successResponse(res, 200, "User fetched", user);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

const getAgentList = async (req, res) => {
  try {
    const agents = await getAgents();
    return successResponse(res, 200, "Agents fetched", agents);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const toggleUserStatus = async (req, res) => {
  try {
    const user = await updateUserStatus(req.params.id, req.body.isActive);
    return successResponse(res, 200, "User status updated", user);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

module.exports = { getUsers, getUser, getAgentList, toggleUserStatus };
