import {
  getAllTodos,
  createTodo,
  updateOneTodo,
  deleteTodoById,
} from "./controllers/todo-list/todo-list.js";
import { getAllData } from "./controllers/index.js";
import mongoose from "mongoose";

import {
  getAllUsers,
  deleteUserById,
  getOneUser,
  createOneUser,
  updateOneUser,
} from "./controllers/users/users.js";
import express from "express";

const api = express();
const PORT = 8080;

api.use(express.json());
const MDBPW = "4wDzvIs6h5VE53Nn";

mongoose.connect(
  `mongodb+srv://sultanboga4:${MDBPW}@nodejs.fon4c1u.mongodb.net/?retryWrites=true&w=majority`
);

api.get("/", getAllData);
api.get("/todos", getAllTodos);
api.get("/users", getAllUsers);
api.get("/users/:id", getOneUser);

api.patch("/users/:id", updateOneUser);
api.patch("/todos/:id", updateOneTodo);

api.delete("/todos/:id", deleteTodoById);
api.delete("/users/:id", deleteUserById);

api.post("/users", createOneUser);
api.post("/todos", createTodo);

api.listen(PORT, () => {
  console.log(`Server is working on: http://localhost:${PORT}`);
});
