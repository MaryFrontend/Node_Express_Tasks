const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const jsonParser = express.json();
const taskRouter = express.Router();

app.get('/',function(req,res){
    res.status(200);
    res.send("<h1>Homepage</h2>");
});
taskRouter.get("/",function(req,res){
    res.status(200);
    res.send("Success");
});
taskRouter.get("/:taskId", function(req,res){
    res.status(200);
    res.send("Success");
    console.log(`taskId:  ${req.params.taskId}`);
});

taskRouter.post('/', jsonParser, function(req,res){
    console.log('Request.body: ',req.body);
    res.status(200);
    res.send("Success");
}); 
taskRouter.put('/:taskId',jsonParser, function(req,res){
    console.log(`taskId:  ${req.params.taskId}`);
    console.log("Title",req.body.title);
    console.log("Description",req.body.discription);
    res.status(200).send("Success");
});

taskRouter.delete('/:taskId',jsonParser, function(req,res){
    console.log(`taskId:  ${req.params.taskId}`);
    res.status(200).send("Success");
});

module.exports = taskRouter;