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

const getTaskById = async (id) => {
    let taskById = tasks.find(task => task.id == id);
    return taskById;
};

const putOneTask = async(id,title, description) => {
    const task = await getTaskById(id);
    if(task){
        task.title = title;
        task.description =  description;
        return task;
    } else{
        return false;
    }   
};

const deleteOneTask = async (id) => {
    const task =await getTaskById(id);
    if(task){
        const deleteTask = tasks.splice(id - 1 , 1);       
        await getTaskById(id);
        if(!await getTaskById(id)) return deleteTask;
    } else{
        return false;
    }
}

module.exports = {getAll, getTaskById, putOneTask, deleteOneTask};