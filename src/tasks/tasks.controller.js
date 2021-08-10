const express = require('express');
const {getTasks, getTaskById, createTask, updateTask, deleteTask} = require('./tasks.service');
const {validateTask} = require('../helpers/validation');
const {buildResponse} = require('../helpers/response');
const {ErrorHandler, handleError} = require('../helpers/error');

console.log('resolve');
const taskRouter = express.Router();

taskRouter.get('/', async (req,res) => {
    try{
        const tasks = await getTasks();
        return buildResponse(res, 200, tasks); 
    } catch(error) {
        if (error instanceof ErrorHandler) {
            return handleError(error, res);
        }
        return buildResponse(res, 500, 'Something get wrong');
    }
});

taskRouter.get('/:id', async (req, res) => { 
    const {id} = req.params;
    try{ 
        const task = await getTaskById(id);
        return buildResponse(res, 200, task); 
    } catch(error) {
        if (error instanceof ErrorHandler) {
            return handleError(error, res);
        }
        return buildResponse(res, 500, 'Something get wrong'); 
    }
});

taskRouter.post('/',validateTask, async (req, res) => { 
    try{
        const task = req.body;
        const create = await createTask(task);
        return buildResponse(res, 201, create);
    } catch(error) {
        if (error instanceof ErrorHandler) {
            return handleError(error, res);
        }
        return buildResponse(res, 500, 'Something get wrong');
    }
}); 

taskRouter.put('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const task = req.body; 
        const update = await updateTask(id, task);
        return buildResponse(res, 200, update);
    } catch(error) {
        if (error instanceof ErrorHandler) {
            return handleError(error, res);
        }
        return buildResponse(res, 500, 'Something get wrong');
    }
});

taskRouter.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try{
        const task = await deleteTask(parseInt(id));
        return buildResponse(res, 204, `Task with id: ${id} deleted successful`);
    } catch(error) {
        if (error instanceof ErrorHandler) {
            return handleError(error, res);
        }
        return buildResponse(res, 500, 'Something get wrong');
    }
});

module.exports = taskRouter;
