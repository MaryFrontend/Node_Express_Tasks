const express = require('express');
const app = express();
const taskRouter = require('./tasks/tasks.controller');

app.use("/tasks", taskRouter);

module.exports = app;


