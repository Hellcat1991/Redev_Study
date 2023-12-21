const UsersServices = require('../services/usersServices')

class UsersControllers {
  usersGet(req, res) {
    const result = UsersServices.getUsers()
    res.json(result);
  }

  userGetId(req, res) {
    const userId = req.params.id;
    const findIndex = users.findIndex((user) => user.id == userId);
    if (findIndex !== -1) {
      res.json(users[findIndex]);
    } else {
      res.status(404).send("Пользователь не найден!");
    }
  }

  userPost(req, res) {
    const { id, userName, email, password } = req.body;
    const newUser = new User(id, userName, email, password);

    users.push(newUser);
    res.status(201);
    res.send(`Новый пользователь ${newUser.userName} успешно создан.`);
  }

  userPut(req, res) {
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
  }

  userPatch(req, res) {
    const userId = req.params.id;
    const { password } = req.body;
    const user = users.find((user) => user.id == userId);

    if (user) {
      user.password = password || user.password;
      res.send("Пароль успешно обновлен!");
    } else {
      res.status(404).send("Пользовавтель не найден");
    }
  }

  userDelete(req, res) {
    const userId = req.params.id;
    const userIndex = users.findIndex((user) => user.id == userId);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      res.send(`Пользлватель с ID ${userId} удален!`);
    } else {
      res.status(404).send("Пользовательне найден!");
    }
  }
}

module.exports = new UsersControllers();
