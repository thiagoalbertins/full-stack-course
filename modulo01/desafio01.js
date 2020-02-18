const express = require("express");

const server = express();

server.use(express.json());
server.use(reqCount);

const projects = [];
var n = 0;

function reqCount(req, res, next) {
  console.log(`O número de requisições realizadas é: ${n}`);
  n++;
  next();
}

function checkId(req, res, next) {
  id = req.params.id;

  project = projects.find(p => p.id === id);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  next();
}

server.post("/projects", (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const tasks = req.body.tasks;

  projects.push({ id: id, title: title, tasks: tasks });

  res.json(projects);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", checkId, (req, res) => {
  id = req.params.id;
  title = req.body.title;

  project = projects.find(project => project.id === id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkId, (req, res) => {
  id = req.params.id;

  projectIndex = projects.findIndex(project => project.id === id);

  projects.splice(projectIndex, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkId, (req, res) => {
  id = req.params.id;
  task = req.body.task;

  project = projects.find(project => project.id === id);
  project.tasks.push(task);

  return res.json(project);
});

server.listen(3000);
