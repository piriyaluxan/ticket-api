const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find().select("-password").sort({ createdAt: -1 });
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

const getAgents = async () => {
  return await User.find({ role: "agent" }).select("_id name email");
};

const updateUserStatus = async (id, isActive) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  user.isActive = isActive;
  await user.save();
  return user;
};

module.exports = { getAllUsers, getUserById, getAgents, updateUserStatus };
