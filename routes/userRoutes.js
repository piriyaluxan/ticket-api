const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  getAgentList,
  toggleUserStatus,
} = require("../controllers/userController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", authorizeRoles("admin"), getUsers);
router.get("/agents", authorizeRoles("admin"), getAgentList);
router.get("/:id", authorizeRoles("admin"), getUser);
router.patch("/:id/status", authorizeRoles("admin"), toggleUserStatus);

module.exports = router;
