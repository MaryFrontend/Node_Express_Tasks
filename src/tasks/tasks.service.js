const { getAll, getById, createOne, updateOne, deleteOne} = require('./repository');

const getTasks = async () => {
    const tasks = await getAll();
    return tasks; 
};

const getTaskById = async (id) => {
    const taskById = await getById(id);
    return taskById;
};

const createTask = async (task) => {
    const newTask = await createOne(task);
    return newTask;
};

const updateTask = async (id, task) => {
    const updateOneTask = await updateOne(id, task);
    return updateOneTask;   
};

const deleteTask = async (id) => {
    const deleteOneTask = await deleteOne(id);
    return deleteOneTask;
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};