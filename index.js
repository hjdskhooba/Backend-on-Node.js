import handleValidatorErrors from "./validations/handleValidatorErrors.js";
import { getAllData } from "./controllers/index.js";
import { createTodo } from "./validations/index.js";
import express from "express";
import mongoose from "mongoose";
import {
  getAllTodos,
  createTodoC,
  updateOneTodo,
  deleteTodoById,
  getOneTodo,
} from "./controllers/todo-list/todo-list.js";
import {
  getAllUsers,
  deleteUserById,
  getOneUser,
  createOneUser,
  updateOneUser,
} from "./controllers/users/users.js";
import {
  todosAll,
  todosCreateM,
  todosOne,
  todosOneDelete,
  todosOneEdit,
} from "./controllers/todosMongo/index.js";
const api = express();
const PORT = 8080;

api.use(express.json());
const MDBPW = "4wDzvIs6h5VE53Nn";

mongoose
  .connect(
    `mongodb+srv://sultanboga4:${MDBPW}@nodejs.fon4c1u.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.error(e));

api.get("/", getAllData);
api.get("/todos", getAllTodos);
api.get("/users", getAllUsers);
api.get("/users/:id", getOneUser);
api.get("/todos/:id", getOneTodo);

api.patch("/users/:id", updateOneUser);
api.patch("/todos/:id", updateOneTodo);

api.patch("/todo/:id", todosOneEdit);

api.delete("/todos/:id", deleteTodoById);
api.delete("/users/:id", deleteUserById);
api.delete("/todo/:id", todosOneDelete);

api.post("/users", createOneUser);
api.post("/todos", createTodo, handleValidatorErrors, createTodoC);
api.post("/todo", todosCreateM);

api.get("/todo", todosAll);
api.get("/todo/:id", todosOne);

api.listen(PORT, () => {
  console.log(`Server is working on: http://localhost:${PORT}`);
});
