const { registerUser, loginUser } = require("../services/authService");
const generateToken = require("../utils/generateToken");
const { successResponse, errorResponse } = require("../utils/response");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await registerUser({ name, email, password, role });
    const token = generateToken(user._id, user.role);

    return successResponse(res, 201, "Registration successful", {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser({ email, password });
    const token = generateToken(user._id, user.role);

    return successResponse(res, 200, "Login successful", {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    return errorResponse(res, 401, error.message);
  }
};

const getMe = async (req, res) => {
  return successResponse(res, 200, "User fetched", req.user);
};

module.exports = { register, login, getMe };
