const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()

app.use(express.json());

const logger = (req, res, next) => {
  console.log(`Request to url ${req.url}`);
  next()
};

app.use(logger)

const users = [
  {id:1, name:"Pasha", gender: 'male', age:25},
  {id:2, name:"Jacky", gender: 'male', age:32},
  {id:3, name:"Nick", gender: 'male', age:52},
  {id:4, name:"Masha", gender: 'female', age:30},
  {id:5, name:"Vika", gender: 'female', age:17},
] ;


app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;

  if(!newUser || typeof newUser !== 'object') {
   return res.status(400).json({error: "Неверные данные"});
};
  users.push(newUser);
  res.status(201);
  res.json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateUserIndex = users.findIndex(user => user.id == userId);

  if (updateUserIndex !== -1) {
    users[updateUserIndex] = {...users[updateUserIndex], ...req.body};
    res.json(users[updateUserIndex]);
} else {
  res.status(404).send('Пользователь не найден');
}
})

app.patch('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updateUserIndex = users.findIndex(user => user.id == userId);

  if (updateUserIndex !== -1) {
    users[updateUserIndex] = {...users[updateUserIndex], ...req.body};
    res.json(users[updateUserIndex]);
} else {
  res.status(404).send('Пользователь не найден');
}
 });


 app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = users.findIndex( user => user.id === userId); 

  if (userId !== -1 && typeof userId === 'number') {
    users.splice(userIndex, 1);
    return res.status(200).send(`Пользователь с ID ${userId} удалён`);
} else {
  res.status(404).send('Пользователь не найден');
}
 });

 app.get('/users/:gender(male||female)', (req, res) => {
  const reqGender = req.params.gender.toLowerCase();
  if (reqGender === 'male' || reqGender === 'female') {
    const filteredGender = users.filter(user => user.gender.toLowerCase() === reqGender);
    res.json(filteredGender);
  } else {
    res.status(400).json({error:'Неверные данные'});
  }
  
 });

app.get('/filteredUsers', (req, res) => {
  const {minAge, maxAge} = req.query;

  if (isNaN(minAge) || isNaN(maxAge) ) {
    res.status(400).json({error:'Неверный тип данных'});
  }

  const filteredResult = users.filter(user => user.age >= minAge && user.age <= maxAge);
  res.json(filteredResult);
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`)
});