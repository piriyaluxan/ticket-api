const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    value: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Counter =
  mongoose.models.Counter || mongoose.model("Counter", counterSchema);

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

const statusHistorySchema = new mongoose.Schema(
  {
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    oldStatus: { type: String },
    newStatus: { type: String },
  },
  { timestamps: true },
);

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: {
      type: String,
      enum: [
        "Bug",
        "Feature Request",
        "Technical Issue",
        "Payment Issue",
        "Account Issue",
        "Other",
      ],
      required: [true, "Category is required"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [commentSchema],
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true },
);

// Auto-generate ticket number before saving
// ticketSchema.pre("save", async function () {
//   if (!this.isNew) return;
//   const count = await mongoose.model("Ticket").countDocuments();
//   this.ticketNumber = `TKT-${String(count + 1).padStart(4, "0")}`;
// });

ticketSchema.pre("save", async function () {
  if (!this.isNew) return;

  const counter = await mongoose
    .model("Counter")
    .findOneAndUpdate(
      { name: "ticket" },
      { $inc: { value: 1 } },
      { new: true, upsert: true },
    );

  this.ticketNumber = `TKT-${String(counter.value).padStart(4, "0")}`;
});
module.exports = mongoose.model("Ticket", ticketSchema);
