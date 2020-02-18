const express = require("express");

const server = express();

server.use(express.json());

const users = ["Diego", "Cláudio", "Victor"];

function checkId(req, res, next) {
  if (!users[req.params.id]) {
    return res.status(404).json({ error: "User id does not exist" });
  }

  return next();
}

server.get("/users/:id", checkId, (req, res) => {
  const id = req.params.id;
  return res.json(users[id]);
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", (req, res) => {
  name = req.body.name;
  users.push(name);
  res.json(users);
});

server.put("/users/:id", checkId, (req, res) => {
  name = req.body.name;
  id = req.params.id;
  users[id] = name;

  return res.json(users);
});

server.delete("/users/:id", checkId, (req, res) => {
  id = req.params.id;
  users.splice(id, 1);
  return res.json(users);
});

server.listen(3000);
