import { format, endOfToday } from "date-fns";


export function Todo() {
    let project = [];

    const getProjects = () => project;
    const addProject = (title, color) => {
        project.push(projectItem(title, color));
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

        return getProjectFolder('default').projectTodo.find(task => task.id == taskID);
    }

    const updateTask = (taskID, title, dueDate, project, priority, description = "") => {

        const task = getTask(taskID);
        moveTaskProject(project, task)
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

    const removeProject = (projectName) => {
        const projectIndex = project.findIndex((project) => project.projectName == projectName)

        console.log('Removing: ' + projectName);
        console.log(projectIndex);
        
        project.splice(projectIndex, 1);
        
    }
    
    

    const removeTask = (task) => {
        console.log(task);
        
        const projectFolder = project.find(projectFolder => projectFolder.projectName == task.project)
        const defaultProject = project.find(projectFolder => projectFolder.projectName == 'default');
        const taskIndex = projectFolder.projectTodo.findIndex(item => item.id == task.id);
        const defaultIndex = defaultProject.projectTodo.findIndex(item => item.id == task.id);
        defaultProject.projectTodo.splice(defaultIndex, 1);
        if(task.project != 'default') projectFolder.projectTodo.splice(taskIndex, 1);
        console.log(projectFolder);
        
    }

    const moveTaskProject = (newProject, task) => {
        const currentProject = getProjectFolder(task.project);

        const taskIndex = currentProject.projectTodo.findIndex(item => item.id == task.id);
        console.log(currentProject.projectTodo[taskIndex].title);
        
        if (task.project != 'default') {
            currentProject.projectTodo.splice(taskIndex, 1);
        }
        if (newProject != 'default') {
            const projectDestination = getProjectFolder(newProject);
            projectDestination.projectTodo.push(task)
        }
    

    }


    return {
        addTask,
        getProjects,
        getProjectFolder,
        addProject,
        getTask,
        updateTask,
        removeTask,
        removeProject,
    }

}

function projectItem(title, color='#457B9D') {
    return {
        "projectName": title,
        "projectTodo": [],
        "color": color,
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