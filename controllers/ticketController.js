const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  updateTicketStatus,
  assignTicket,
  addComment,
} = require("../services/ticketService");
const { successResponse, errorResponse } = require("../utils/response");

const create = async (req, res) => {
  try {
    const ticket = await createTicket(req.body, req.user._id);
    return successResponse(res, 201, "Ticket created", ticket);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await getAllTickets(req.user.role, req.user._id, req.query);
    return successResponse(res, 200, "Tickets fetched", result);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const ticket = await getTicketById(
      req.params.id,
      req.user.role,
      req.user._id,
    );
    return successResponse(res, 200, "Ticket fetched", ticket);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

const update = async (req, res) => {
  try {
    const ticket = await updateTicket(
      req.params.id,
      req.body,
      req.user.role,
      req.user._id,
    );
    return successResponse(res, 200, "Ticket updated", ticket);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const remove = async (req, res) => {
  try {
    await deleteTicket(req.params.id);
    return successResponse(res, 200, "Ticket deleted");
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const ticket = await updateTicketStatus(
      req.params.id,
      req.body.status,
      req.user._id,
    );
    return successResponse(res, 200, "Status updated", ticket);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const assign = async (req, res) => {
  try {
    const ticket = await assignTicket(req.params.id, req.body.agentId);
    return successResponse(res, 200, "Ticket assigned", ticket);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const comment = async (req, res) => {
  try {
    const ticket = await addComment(
      req.params.id,
      req.body.message,
      req.user._id,
      req.user.role,
    );
    return successResponse(res, 200, "Comment added", ticket);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
  assign,
  comment,
};
