const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  getOne,
  update,
  remove,
  updateStatus,
  assign,
  comment,
} = require("../controllers/ticketController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getAll);
router.post("/", create);
router.get("/:id", getOne);
router.put("/:id", update);
router.delete("/:id", authorizeRoles("admin"), remove);
router.patch("/:id/status", authorizeRoles("admin", "agent"), updateStatus);
router.patch("/:id/assign", authorizeRoles("admin"), assign);
router.post("/:id/comments", comment);

module.exports = router;
