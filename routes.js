const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(express.json());

const logger = (req, res, next) => {
  console.log(`Request to url ${req.url}`);
  next();
};

app.use(logger);

class User {
  constructor(id, userName, email, password) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.password = password;
  }
}

const users = [];

app.get("/api/hello", (req, res) => {
  res.send("Привет, Redev!");
});

app.post("/api/echo", (req, res) => {
  const message = req.body.message;
  res.send(message);
});

app.post("/api/users", (req, res) => {
  const { id, userName, email, password } = req.body;
  const newUser = new User(id, userName, email, password);

  users.push(newUser);
  res.status(201);
  res.send(`Новый пользователь ${newUser.userName} успешно создан.`);
});

app.get("/api/users", (req, res) => {
  res.json({ users });
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const findIndex = users.findIndex((user) => user.id == userId);
  if (findIndex !== -1) {
    res.json(users[findIndex]);
  } else {
    res.status(404).send("Пользователь не найден!");
  }
});

app.put("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { userName, email, password } = req.body;
  const user = users.find((user) => user.id == userId);

  if (user) {
    user.userName = userName || user.userName;
    user.email = email || user.email;
    user.password = password || user.password;
    res.send("Информация о пользователе обновлена!");
  } else {
    res.status(404).send("Пользовавтель не найден");
  }
});

app.patch("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const { password } = req.body;
  const user = users.find((user) => user.id == userId);

  if (user) {
    user.password = password || user.password;
    res.send("Пароль успешно обновлен!");
  } else {
    res.status(404).send("Пользовавтель не найден");
  }
});

app.delete("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex((user) => user.id == userId);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.send(`Пользлватель с ID ${userId} удален!`);
  } else {
    res.status(404).send("Пользовательне найден!");
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
