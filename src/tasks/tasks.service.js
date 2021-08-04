const { getAll, getById, createOne, updateOne, deleteOne} = require('./repository');

const getTasks = async () => {
    try {
        const tasks = await getAll();
        return tasks;
    } catch(error) {
        throw error;
    }
};

const getTaskById = async (id) => {
    try {
        const taskById = await getById(id);
        return taskById;
    } catch(error) {
        throw error;
    }
};

const createTask = async (task) => {
    try {
        const newTask = await createOne(task);
        return newTask;
    } catch(error) {
        throw error;
    } 
};

const updateTask = async (id, task) => {
    try {
        const updateOneTask = await updateOne(id, task);
        return updateOneTask;
    } catch(error) {
        throw error;
    }
};

const deleteTask = async (id) => {
    try {
        const deleteOneTask = await deleteOne(id);
        return deleteOneTask;
    } catch(error) {
        throw error;
    }
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};