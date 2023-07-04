import fs from "node:fs";

const getAllUsersFS = () => {
  try {
    let base = fs.readFileSync("data/users.json", "utf-8", (err, data) => {
      if (err) {
        throw new Error(err.message);
      } else {
        return data;
      }
    });
    return base;
  } catch (e) {
    return [];
  }
};

let users = JSON.parse(getAllUsersFS());

export const getAllUsers = (req, res) => {
  let data = users;

  if (req.query.gender) {
    data = data.filter((i) => i.gender === req.query.gender);
  }

  if (req.query.limit) {
    let limit = req.query.limit;
    data = data.slice(0, limit);
  }
  if (req.query.limit && req.query.page) {
    let limit = req.query.limit;
    let page = req.query.page;
    data = users.slice(limit * page - limit, limit * page);
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

export const getOneUser = (req, res) => {
  try {
    const user = users.find((i) => i.id == req.params.id);
    if (!user) {
      throw new Error("User not found");
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const createOneUser = (req, res) => {
  try {
    if (
      users.some((el) => el.id == req.body.id) === false &&
      req.body.id != undefined
    ) {
      const newData = [...users, req.body];
      fs.writeFile("data/users.json", JSON.stringify(newData), () => {
        res.json(req.body);
      });
    } else {
      res.status(400).json("Object already exists");
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

export const updateOneUser = (req, res) => {
  try {
    if (
      users.some((el) => el.id == req.body.id) === false &&
      req.body.id != undefined
    ) {
      const newData = users.map((item) =>
        item.id == req.params.id ? { ...item, ...req.body } : item
      );
      fs.writeFile("data/users.json", JSON.stringify(newData), () => {
        res.json(newData.find((el) => el.id == req.params.id));
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

export const deleteUserById = (req, res) => {
  try {
    const newData = users.filter((i) => i.id != req.params.id);
    fs.writeFile("data/users.json", JSON.stringify(newData), () => {
      res.json(newData);
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
