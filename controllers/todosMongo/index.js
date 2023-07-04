import Todo from "../../models/todo.js";

const he = (e, res) => {
  res.status(500).json({
    message: e.message,
  });
};

export const todosAll = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (e) {
    he(e, res);
  }
};
export const todosOne = async (req, res) => {
  try {
    const todoId = req.params.id;
    const doc = await Todo.findById({ _id: todoId });
    res.json(doc);
  } catch (e) {
    he(e, res);
  }
};
export const todosOneEdit = async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.updateOne(
      {
        _id: todoId,
      },
      req.body,
      {
        returnDocument: "after",
      }
    );
    res.json(await Todo.findById({ _id: todoId }));
  } catch (e) {
    he(e, res);
  }
};
export const todosOneDelete = async (req, res) => {
  try {
    const todoId = req.params.id;
    await Todo.deleteOne({ _id: todoId });
    res.json({ success: true });
  } catch (e) {
    he(e, res);
  }
};

export const todosCreateM = async (req, res) => {
  try {
    const doc = new Todo({
      text: req.body.text,
      age: req.body.age,
      important: false,
      done: false,
      time: Date.now(),
    });
    const todos = await doc.save();
    res.json(todos);
  } catch (e) {
    he(e, res);
  }
};
