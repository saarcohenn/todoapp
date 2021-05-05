const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const app = express();

// middleware for data on post request
app.use(cors());
app.use(express.json({ extended: false }));

const todos = [
  {
    id: "1",
    message: "Finish todos App",
    isComplete: false,
  },
  {
    id: "2",
    message: "Upload to GitHub",
    isComplete: false,
  },
  {
    id: "3",
    message: "Send To Ben",
    isComplete: false,
  },
];

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});

// Get Requests
app.get("/", (req, res) => {
  res.status(200).json(todos);
});

// Post Requests
app.post("/", (req, res) => {
  const newTodo = {
    message: req.body.message,
    id: uuidv4(),
    isComplete: false,
  };

  todos.push(newTodo);
  res.status(201).json(todos);
});

app.post("/complete/", (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.body.id) todos[i].isComplete = true;
  }

  res.status(202).json(todos);
});

app.post("/uncomplete/", (req, res) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.body.id) todos[i].isComplete = false;
  }

  res.status(202).json(todos);
});

app.post("/remove/", (req, res) => {
  let index;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === req.body.id) {
      index = i;
      break;
    }
  }

  todos.splice(index, 1);

  res.status(202).json(todos);
});
