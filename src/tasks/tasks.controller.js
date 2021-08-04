const express = require('express');
const {getTasks, getTaskById, createTask, updateTask, deleteTask} = require('./tasks.service');
const {validateTask} = require('../helpers/validation');
const {buildResponse} = require('../helpers/response');
const taskRouter = express.Router();
const {ErrorHandler, handleError} = require('../helpers/error');
const errorCustom = new ErrorHandler(404, 'Tasks did not found');

taskRouter.get('/', async (req,res) => {
    try{
        const tasks = await getTasks();
        if (!tasks) {
            handleError(errorCustom, res);
        }
        return buildResponse(res, 200, tasks); 
    } catch(error) {
        return buildResponse(res, 404, 'Tasks did not found');
    }
});

taskRouter.get('/:id', async (req, res) => { 
    const {id} = req.params;
    try{ 
        const task = await getTaskById(id);
        if (!task) {
            handleError(errorCustom, res);
        }
        return buildResponse(res, 200, task); 
    } catch(error) {
        return buildResponse(res, 404, `Task with id: ${id} not found`); 
    }
});

taskRouter.post('/',validateTask, async (req, res) => { 
    try{
        const task = req.body;
        const create = await createTask(task);
        if (!create) {
            handleError(errorCustom, res);
        }
        return buildResponse(res, 201, create);
    } catch(error) {
        return buildResponse(res, 404, 'A new task did not created');
    }
}); 

taskRouter.put('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const task = req.body; 
        const update = await updateTask(id, task);
        if (!update) {
            handleError(errorCustom, res);
        }
        return buildResponse(res, 200, task);
    } catch(error) {
        return buildResponse(res, 404, `Task with id: ${id} not found`);
    }
});

taskRouter.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const task = await deleteTask(parseInt(id));
        console.log('deleteTask: ' + task);
        if (!task) {
            handleError(errorCustom, res);
        }
        return buildResponse(res, 204, task);
    } catch(error) {
        return buildResponse(res, 404, `Task with id: ${id} not found`);
    }
});

module.exports = taskRouter;