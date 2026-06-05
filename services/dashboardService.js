const Ticket = require("../models/Ticket");

const getDashboardStats = async (userRole, userId) => {
  let filter = {};

  if (userRole === "user") filter.createdBy = userId;
  if (userRole === "agent") filter.assignedTo = userId;

  const [total, open, inProgress, resolved, closed, urgent, high] =
    await Promise.all([
      Ticket.countDocuments(filter),
      Ticket.countDocuments({ ...filter, status: "Open" }),
      Ticket.countDocuments({ ...filter, status: "In Progress" }),
      Ticket.countDocuments({ ...filter, status: "Resolved" }),
      Ticket.countDocuments({ ...filter, status: "Closed" }),
      Ticket.countDocuments({ ...filter, priority: "Urgent" }),
      Ticket.countDocuments({ ...filter, priority: "High" }),
    ]);

  // Recent tickets
  const recentTickets = await Ticket.find(filter)
    .populate("createdBy", "name")
    .populate("assignedTo", "name")
    .sort({ createdAt: -1 })
    .limit(5);

  // Category breakdown
  const categoryBreakdown = await Ticket.aggregate([
    { $match: filter },
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  return {
    summary: { total, open, inProgress, resolved, closed, urgent, high },
    recentTickets,
    categoryBreakdown,
  };
};

module.exports = { getDashboardStats };
