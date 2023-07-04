import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const todoSchema = Schema(
  {
    text: { type: String, required: true },
    important: { type: Boolean, required: true },
    done: { type: Boolean, required: true },
    time: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
