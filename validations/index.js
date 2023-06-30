import { body } from "express-validator";

export const createTodo = [
  body("text", "Text's length should not be less than 3 characters")
    .isString()
    .isLength({
      min: 3,
      max: 122,
    }),
  body("important", 'Your todo doesn\'t have "important" section').isBoolean(),
  body("done", 'Your todo doesn\'t have "done" section').isBoolean(),
  body("date", "Your todo doesn't have a date").isDate({ format: "MM/DD/YY" }),
];
