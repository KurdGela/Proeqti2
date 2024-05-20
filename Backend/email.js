import mongoose, { mongo } from "mongoose";

// ვქმნი email-ის სქემას
const emailSchema = new mongoose.Schema(
  {
    recipients: String,
    subject: String,
    body: String,
  },
  { timestamps: true }
);

// ვქმნი მოდელს რომელსაც ვაწოდებ სქემას
export const Email = mongoose.model("Email", emailSchema);
