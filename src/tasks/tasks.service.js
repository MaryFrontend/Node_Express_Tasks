const tasks = [
    {id: 1, title: 'element', description: 'first el'},
    {id: 2, title: 'element', description: 'second el'},
    {id: 3, title: 'element', description: 'third el'},
    {id: 4, title: 'element', description: 'fourth el'}
];

const getAll = async () => {
    console.log(tasks);
    return tasks;
};

const getOneTask = async (id) => {
    for (let task of tasks){
        if(task.id == id){
            console.log(task);
            return task;
        };
    };
};

const putOneTask = async(id,title, description) => {
    const task = getOneTask(id);
    task.title = title;
    task.description =  description;
    console.log(task);
    return task;
};

const deleteOneTask = async (id) => {
    const task = getOneTask(id);
    const deleteTask = tasks.splice(id - 1 , 1);
    return deleteTask;
}

module.exports = {getAll, getOneTask, putOneTask, deleteOneTask};