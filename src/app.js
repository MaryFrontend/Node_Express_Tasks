const express = require('express');
const app = express();
const taskRouter = require('./tasks/tasks.controller');

app.get('/',function(req,res){
    res.status(200);
    res.send("<h1>Homepage</h2>");
});

app.use("/tasks", taskRouter);

module.exports = app;


