const express = require('express');
const taskRouter = require('./tasks/tasks.controller');


const app = express();
const jsonParser = express.json();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200);
    res.send('<h1>Homepage</h2>');
});

app.use('/tasks', taskRouter);


module.exports = app;


