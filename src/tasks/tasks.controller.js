const express = require('express');
const bodyParser = require("body-parser");
const getAll = require("./tasks.service");
const getOneTask = require("./tasks.service");
const putOneTask = require('./tasks.service');
const deleteOneTask = require('./tasks.service');

const app = express();
const jsonParser = express.json();
const taskRouter = express.Router();


taskRouter.get("/",function(req,res){
    getAll();
    res.status(200).send("Success");
});
taskRouter.get("/:Id", function(req,res){
    res.status(200).send("Success");
    console.log(`Id:  ${req.params.Id}`);
    getOneTask(req.params.Id);
});

taskRouter.post('/', jsonParser, function(req,res){
    console.log('Request.body: ',req.body);
    res.status(200).send("Success");
}); 
taskRouter.put('/:Id',jsonParser, function(req,res){
    putOneTask(req.params.Id,req.body.title,req.body.discription);
    res.status(200).send("Success");
});

taskRouter.delete('/:Id',jsonParser, function(req,res){
    deleteOneTask(req.params.Id);
    res.status(200).send("Success");
});

module.exports = taskRouter;