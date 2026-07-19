// Create list object
//List attributes: title, description, dueDate, priority
//Add lists to an array
//An array of objects of lists
import { format, endOfToday } from "date-fns";

function todoList() {
    let todoItems = [];

    const getItems = () => todoItems;

    const addTodo = (title, description, dueDate, project, priority) => {
        todoItems.push(todoItem(title, description, dueDate, project, priority,))
    }


    const markComplete = (id) => {
        const completedItem = todoItems.findIndex(task => task.id == id);
        todoItems.splice(completedItem, 1)

    }

    const updateTask = (taskID, title, dueDate, project, priority, description = "") => {

        const updateTask = todoItems.find(task => task.id === taskID)

        if (updateTask) {
            Object.assign(updateTask, {
                title,
                dueDate,
                project,
                priority,
                description,
            })
        }
    }

    const getTask = (taskID) => {
         return todoItems.find(task => task.id == taskID);
    }


    return {
        getItems,
        addTodo,
        markComplete,
        getTask,
        updateTask,
    }
}

function todoProjects() {
    let projectList = [];

    const getProjects = () => projectList;

    const addProject = (title) => {
        projectList.push(projectItem(title));
    }

    const getProjectFolder = (projectName) => {
        return projectList.find(project => project.projectName == projectName)
    }

    const addTask = (todoItems, projectName, task) => {
        const projectFolder = projectList.find(project => project.projectName == projectName);
        const taskItem = todoItems.find(taskItem => taskItem == task);

        taskItem.project = projectName;
        projectFolder.projectTodo.push(taskItem);

    }

    const updateTask = (projectName, task) => {

    }

    const removeTask = (task) => {
        console.log(task);
        
        // const projectFolder = projectList.find(project => project.projectName == task.project);
        // console.log(projectFolder)

        let index = 0;
        projectLoop: for (const project of projectList) {
            if (project['projectName'] == projectName) {
                const projectTask = projectList[index]['projectTodo'];

                for (const task of projectTask) {
                    let taskIndex = 0;
                    if (task['id'] == taskID) {
                        projectTask.splice(taskIndex, 1);
                        break projectLoop;
                    }
                }
            }
            index++
        }
    }


    return {
        getProjects,
        addProject,
        addTask,
        removeTask,
        getProjectFolder,
    }
}

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


export { todoList, todoProjects }