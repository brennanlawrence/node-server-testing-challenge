const express = require("express");
const server = express();

let foods = ["beef", "rice"];

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/foods", (req, res) => {
  res.status(200).json(foods);
});

server.post("/foods", (req, res) => {
  foods.push(req.body.food);
  res.status(201).json(req.body);
});

server.delete("/foods/:id", (req, res) => {
  const { id } = req.params;
  foods.splice(id, 1);
  res.status(200).json(foods);
});
module.exports = server;
