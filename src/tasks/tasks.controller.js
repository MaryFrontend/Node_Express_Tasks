const express = require('express');
const bodyParser = require("body-parser");
const {getAll ,getTaskById, putOneTask, deleteOneTask} = require("./tasks.service");

const app = express();
const jsonParser = express.json();
const taskRouter = express.Router();


taskRouter.get("/",function(req,res){
    getAll();
    res.status(200).send("Success");
});

taskRouter.get("/:Id", async function(req,res){ 
    try{ 
        const taskById = await getTaskById(req.params.Id);
        if (taskById == undefined){
            throw new Error;
        }
        return res.status(200).json(taskById); 
    } catch(e) {
        return res.status(404).send('Таск с искомым Id не найден!');
    }
});

taskRouter.post('/', jsonParser, function(req,res){
    res.status(200).json(req.body);
}); 

taskRouter.put('/:Id',jsonParser, async function(req,res){
    try{
        const putTask = await putOneTask(req.params.Id,req.body.title,req.body.discription);
        console.log('putTack: ' + putTask);
        if(!putTask){
            throw new Error;
        }
        return res.status(200).json(putTask);
    } catch(e){
        return res.status(404).send('Таск с искомым Id не найден!');
    }
});


taskRouter.delete('/:Id',jsonParser, async function(req,res){
    try{
        const deleteTask = await deleteOneTask(parseInt(req.params.Id));
        console.log("deleteTask: " + deleteTask);
        if(!deleteTask){
            throw new Error;
        }
        return res.status(200).json(deleteTask);
    }catch(e){
        return res.status(404).send('Task is not deleted');
    }
});

module.exports = taskRouter;