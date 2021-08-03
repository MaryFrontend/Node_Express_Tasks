const express = require('express');
const {getTasks, getTaskById, createTask, updateTask, deleteTask} = require('./tasks.service');
const {validateTask} = require('../helpers/validation');
const createTsk = require('./repository');
const taskRouter = express.Router();

taskRouter.get('/', async (req,res) => {
    try{
        const tasks = await getTasks();
        if (!tasks) {
            throw new Error;
        }
        return res.status(200).send('Success');
    } catch(e) {
        return res.status(404).send('Tasks did not found');
    }
});

taskRouter.get('/:id', async (req, res) => { 
    const {id} = req.params;
    try{ 
        const task = await getTaskById(id);
        if (!task) {
            throw new Error;
        }
        return res.status(200).json(task); 
    } catch(e) {
        return res.status(404).send(`Task with id: ${id} not found`);
    }
});

taskRouter.post('/', validateTask, async (req,res) => { 
    try{
        const task = req.body;
        const create_Task = await createTask(task);
        if (!create_Task) {
            throw new Error;
        }
        return res.status(200).json(req.body);
    } catch(e) {
        return res.status(404).send('A new task did not created');
    }
}); 

taskRouter.put('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        // const {title,description } = req.body;
        const task = req.body; 
        const UpdateTask = await updateTask(id, task);
        console.log('putTack: ' + UpdateTask);
        if (!UpdateTask) {
            throw new Error;
        }
        return res.status(200).json(UpdateTask);
    } catch(e) {
        return res.status(404).send(`Task with id: ${id} not found`);
    }
});

taskRouter.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const task = await deleteTask(parseInt(id));
        console.log('deleteTask: ' + task);
        if (!task) {
            throw new Error;
        }
        return res.status(200).json(task);
    } catch(e) {
        return res.status(404).send(`Task with id: ${id} not found`);
    }
});

module.exports = taskRouter;