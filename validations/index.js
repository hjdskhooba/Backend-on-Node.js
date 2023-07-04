import { body } from "express-validator";

export const createTodo = [
  body(
    "text",
    "Text's length should be more than 3 and less than 222 characters"
  )
    .isString()
    .isLength({
      min: 3,
      max: 222,
    }),
];
