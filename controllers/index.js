import fs from "node:fs";

const getAllDataFS = () => {
  try {
    let users = JSON.parse(
      fs.readFileSync("data/users.json", "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          return data;
        }
      })
    );
    let todo = JSON.parse(
      fs.readFileSync("data/todo.json", "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          return data;
        }
      })
    );
    return { users, todo };
  } catch (e) {
    console.error("Error: ", e);
  }
};

const dbData = getAllDataFS();

export const getAllData = (req, res) => {
  try {
    fs.writeFile(
      "data/db.json",
      JSON.stringify({ users: dbData.users, todo: dbData.todo }),
      () => {
        res.send(dbData);
      }
    );
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
