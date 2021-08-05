const { getAll, getById, createOne, updateOne, deleteOne} = require('./repository');

const getTasks = async () => {
    try {
        return await getAll();
    } catch(error) {
        throw error;
    }
};

const getTaskById = async (id) => {
    try {
        return await getById(id);
    } catch(error) {
        throw error;
    }
};

const createTask = async (task) => {
    try {
        return await createOne(task);
    } catch(error) {
        throw error;
    } 
};

const updateTask = async (id, task) => {
    try {
        return await updateOne(id, task);
    } catch(error) {
        throw error;
    }
};

const deleteTask = async (id) => {
    try {
        return await deleteOne(id);
    } catch(error) {
        throw error;
    }
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};