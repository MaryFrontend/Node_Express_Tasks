const express = require('express');
const {getTasks, getTaskById, updateTask, deleteTask} = require('./tasks.service');


const taskRouter = express.Router();


taskRouter.get('/', (req,res) => {
    getTasks();
    res.status(200).send('Success');
});

taskRouter.get('/:id', async (req, res) => { 
    try{ 
        const {id} = req.params;
        const taskById = await getTaskById(id);
        if (taskById == undefined) {
            throw new Error;
        }
        return res.status(200).json(taskById); 
    } catch(e) {
        return res.status(404).send('Таск с искомым Id не найден!');
    }
});

taskRouter.post('/', (req,res) => {
    res.status(200).json(req.body);
}); 

taskRouter.put('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const {title,discription } = req.body;
        const update_Task = await updateTask(id, title, discription);
        console.log('putTack: ' + update_Task);
        if (!update_Task) {
            throw new Error;
        }
        return res.status(200).json(update_Task);
    } catch(e) {
        return res.status(404).send('Таск с искомым Id не найден!');
    }
});


taskRouter.delete('/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const delete_Task = await deleteTask(parseInt(id));
        console.log('deleteTask: ' + delete_Task);
        if (!delete_Task) {
            throw new Error;
        }
        return res.status(200).json(delete_Task);
    } catch(e) {
        return res.status(404).send('Task is not deleted');
    }
});

module.exports = taskRouter;