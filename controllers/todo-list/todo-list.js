import fs from "node:fs";

const getAllTodosFS = () => {
  try {
    let base = fs.readFileSync("data/todo.json", "utf-8", (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        return data;
      }
    });
    return base;
  } catch (e) {
    console.error("Error: ", e);
  }
};

let dbTodos = JSON.parse(getAllTodosFS());

export const getAllTodos = async (req, res) => {
  const data = dbTodos;
  const is = req.query.done == "true" ? true : false;

  if (req.query.done) {
    data = data.filter((i) => i.gender == is);
  }

  if (req.query.limit) {
    let limit = req.query.limit;
    data = data.slice(0, limit);
  }
  if (req.query.limit && req.query.page) {
    let limit = req.query.limit;
    let page = req.query.page;
    data = todos.slice(limit * page - limit, limit * page);
  }
  // _sort=views&_order=asc
  if (req.query._sort && req.query._order) {
    let byField = (field, order) => {
      return (a, b) =>
        order == "desc"
          ? +a[field] > +b[field]
            ? -1
            : 1
          : +a[field] < +b[field]
          ? -1
          : 1;
    };
    let sort = req.query._sort;
    let order = req.query._order;
    data = data.sort(byField(sort, order));
  }

  res.send(data);
};

export const createTodo = (req, res) => {
  try {
    if (
      dbTodos.some((el) => el.id == req.body.id) === false &&
      req.body.id != undefined
    ) {
      const newData = [...dbTodos, req.body];
      fs.writeFile("data/todo.json", JSON.stringify(newData), () => {
        res.json(newData);
      });
    } else {
      res.status(400).json("An object with the same ID already exists");
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const deleteTodoById = (req, res) => {
  try {
    const newData = dbTodos.filter((i) => i.id != req.params.id);
    fs.writeFile("data/todo.json", JSON.stringify(newData), () => {
      res.json(newData);
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const updateOneTodo = (req, res) => {
  try {
    if (dbTodos.some((el) => el.id == req.params.id)) {
      const newData = dbTodos.map((i) =>
        i.id == req.params.id ? { ...i, ...req.body } : i
      );
      const eo = newData.find((el) => el.id == req.params.id);
      fs.writeFile("data/todo.json", JSON.stringify(newData), () => {
        res.json(eo);
      });
    } else {
      res
        .status(400)
        .json({ message: "There is no object with id -" + req.params.id });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
    console.error("Error: ", e);
  }
};
