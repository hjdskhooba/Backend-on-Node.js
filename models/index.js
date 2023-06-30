import { mongoose } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    important: { type: Boolean, required: true },
    done: { type: Boolean, required: true },
    created_at: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("todos", todoSchema);
