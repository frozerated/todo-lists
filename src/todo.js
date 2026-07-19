import { format, endOfToday } from "date-fns";


export function Todo() {
    let project = [];

    const getProjects = () => project;
    const addProject = (title) => {
        project.push(projectItem(title));
    }
    addProject('default');

    const getProjectFolder = (projectName) => {
        return project.find(project => project.projectName == projectName);
    }

    const addTask = (title, description, dueDate, projectName, priority) => {

        const newTask = todoItem(title, description, dueDate, projectName, priority);

        getProjectFolder('default').projectTodo.push(newTask);
        if (projectName && projectName != 'default') {
            getProjectFolder(projectName).projectTodo.push(newTask);
        }
    }

    const getTask = (taskID) => {
        // console.log(getProjectFolder('default'));

        return getProjectFolder('default').projectTodo.find(task => task.id == taskID);
    }

    const updateTask = (taskID, title, dueDate, project, priority, description = "") => {

        const task = getTask(taskID);
        if (task) {
            Object.assign(task, {
                title,
                dueDate,
                project,
                priority,
                description,
            })
        }
    }

    const removeTask = (task) => {
        const projectFolder = project.find(project => project.projectName == task.project)
        const taskIndex = projectFolder.projectTodo.findIndex(item => item.id == task.id);
        projectFolder.projectTodo.splice(taskIndex, 1);
    }



    return {
        addTask,
        getProjects,
        getProjectFolder,
        addProject,
        getTask,
        updateTask,
        removeTask,
    }

}



// function todoList() {
//     let todoItems = [];

//     const getItems = () => todoItems;

//     const addTodo = (title, description, dueDate, project, priority) => {
//         todoItems.push(todoItem(title, description, dueDate, project, priority,))
//     }


//     const markComplete = (id) => {
//         const completedItem = todoItems.findIndex(task => task.id == id);
//         todoItems.splice(completedItem, 1)

//     }

//     const updateTask = (taskID, title, dueDate, project, priority, description = "") => {

//         const updateTask = todoItems.find(task => task.id === taskID)

//         if (updateTask) {
//             Object.assign(updateTask, {
//                 title,
//                 dueDate,
//                 project,
//                 priority,
//                 description,
//             })
//         }
//     }

//     const getTask = (taskID) => {
//         return todoItems.find(task => task.id == taskID);
//     }


//     return {
//         getItems,
//         addTodo,
//         markComplete,
//         getTask,
//         updateTask,
//     }
// }

// function todoProjects() {
//     let projectList = [];

//     const getProjects = () => projectList;

//     const addProject = (title) => {
//         projectList.push(projectItem(title));
//     }

//     const getProjectFolder = (projectName) => {
//         return projectList.find(project => project.projectName == projectName)
//     }

//     const addTask = (todoItems, projectName, task) => {
//         const projectFolder = projectList.find(project => project.projectName == projectName);
//         const taskItem = todoItems.find(taskItem => taskItem == task);

//         taskItem.project = projectName;
//         projectFolder.projectTodo.push(taskItem);

//     }

//     const updateTask = (projectName, task) => {
//         // const projectFolder = projectList.find(project => project.projectName = projectName);


//     }

//     const removeTask = (task) => {
//         const projectFolder = projectList.find(project => project.projectName == task.project)
//         const taskIndex = projectFolder.projectTodo.findIndex(item => item.id == task.id);
//         projectFolder.projectTodo.splice(taskIndex, 1);
//     }


//     return {
//         getProjects,
//         addProject,
//         addTask,
//         removeTask,
//         getProjectFolder,
//         updateTask,
//     }
// }

function projectItem(title) {

    return {
        "projectName": title,
        "projectTodo": [],
    }
}


function todoItem(title, description = "", dueDate, project = 'default', priority = 'minor') {

    dueDate = new Date(dueDate);
    const id = crypto.randomUUID().slice(1, 15);

    return {
        id,
        title,
        description,
        dueDate,
        project,
        priority,
    }
}


// export { todoList, todoProjects }