const express = require('express');
const taskRouter = require('./tasks/tasks.controller');
const { handleError, ErrorHandler } = require('./helpers/error');

const app = express();
const jsonParser = express.json();

app.use(express.json());

app.get('/', (req,res) => {
    res.status(200);
    res.send('<h1>Homepage</h2>');
});

app.get('/error', (req, res) => {
    throw new ErrorHandler(500, 'Internal server error');
});  

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.use('/tasks', taskRouter);

module.exports = app;


