const { getDashboardStats } = require("../services/dashboardService");
const { successResponse, errorResponse } = require("../utils/response");

const getStats = async (req, res) => {
  try {
    const stats = await getDashboardStats(req.user.role, req.user._id);
    return successResponse(res, 200, "Dashboard stats fetched", stats);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

module.exports = { getStats };
