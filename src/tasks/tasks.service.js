const { getAll, getById, createOne, updateOne, deleteOne} = require('./repository');
const {ErrorHandler, handleError} = require('../helpers/error');

const getTasks = async () => {
    try {
        const tasks = await getAll();
        if (!tasks) {
            throw new ErrorHandler(404, 'Tasks did not found');
        }
        return tasks;
    } catch(error) {
        throw error;//ошибка сервера (500)
    }
};

const getTaskById = async (id) => {
    try {
        const task = await getById(id);
        if (!task) {
            throw new ErrorHandler(404, 'Task did not found');
        }
        return task;
    } catch(error) {
        throw error;
    }
};

const createTask = async (task) => {
    try {
        const create = await createOne(task);
        if (!create) {
            throw new ErrorHandler(404, 'Task did not found');
        }
        return create;
    } catch(error) {
        throw error;
    } 
};

const updateTask = async (id, task) => {
    try {
        const update = await updateOne(id, task);
        if (!update) {
            throw new ErrorHandler(404, 'Task did not found');
        }
        return update;
    } catch(error) {
        throw error;
    }
};

const deleteTask = async (id) => {
    try {
        const task = await deleteOne(id);
        if (!task) {
            throw new ErrorHandler(404, 'Task did not found');
        }
        return task;
    } catch(error) {
        throw error;
    }
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};