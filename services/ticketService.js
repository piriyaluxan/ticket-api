const Ticket = require("../models/Ticket");

const createTicket = async (data, userId) => {
  const ticket = await Ticket.create({ ...data, createdBy: userId });
  return ticket;
};

const getAllTickets = async (userRole, userId, query) => {
  const { status, priority, category, search, page = 1, limit = 10 } = query;

  const filter = {};

  // Users can only see their own tickets
  if (userRole === "user") filter.createdBy = userId;

  // Agents can only see assigned tickets
  if (userRole === "agent") filter.assignedTo = userId;

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (category) filter.category = category;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { ticketNumber: { $regex: search, $options: "i" } },
    ];
  }

  const total = await Ticket.countDocuments(filter);
  const tickets = await Ticket.find(filter)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .sort(query.sort || "-createdAt")
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return { tickets, total, page: Number(page), limit: Number(limit) };
};

const getTicketById = async (ticketId, userRole, userId) => {
  const ticket = await Ticket.findById(ticketId)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .populate("comments.user", "name email role")
    .populate("statusHistory.changedBy", "name email");

  if (!ticket) throw new Error("Ticket not found");

  if (
    userRole === "user" &&
    ticket.createdBy._id.toString() !== userId.toString()
  ) {
    throw new Error("Not authorized to view this ticket");
  }

  return ticket;
};

const updateTicket = async (ticketId, data, userRole, userId) => {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new Error("Ticket not found");

  if (
    userRole === "user" &&
    ticket.createdBy.toString() !== userId.toString()
  ) {
    throw new Error("Not authorized to update this ticket");
  }

  Object.assign(ticket, data);
  await ticket.save();
  return ticket;
};

const deleteTicket = async (ticketId) => {
  const ticket = await Ticket.findByIdAndDelete(ticketId);
  if (!ticket) throw new Error("Ticket not found");
  return ticket;
};

const updateTicketStatus = async (ticketId, newStatus, userId) => {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new Error("Ticket not found");

  ticket.statusHistory.push({
    changedBy: userId,
    oldStatus: ticket.status,
    newStatus,
  });

  ticket.status = newStatus;
  await ticket.save();
  return ticket;
};

const assignTicket = async (ticketId, agentId) => {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new Error("Ticket not found");

  ticket.assignedTo = agentId;
  await ticket.save();
  return ticket;
};

const addComment = async (ticketId, message, userId, userRole) => {
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) throw new Error("Ticket not found");

  if (
    userRole === "user" &&
    ticket.createdBy.toString() !== userId.toString()
  ) {
    throw new Error("Not authorized to comment on this ticket");
  }

  ticket.comments.push({ user: userId, message });
  await ticket.save();
  return ticket;
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  updateTicketStatus,
  assignTicket,
  addComment,
};
