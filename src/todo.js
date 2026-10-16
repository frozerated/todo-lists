import { format, endOfToday } from "date-fns";


export function Todo(project=[]) {

    const getProjects = () => project;
    const addProject = (title, color) => {
        project.push(projectItem(title, color));
    }
    
    if(project.length == 0){
        addProject('default');
    }

    const getProjectFolder = (projectName) => {
        return project.find(project => project.projectName == projectName);
    }

    const addTask = (title, description, dueDate, projectName, priority) => {

        const newTask = todoItem(title, description, dueDate, projectName, priority);


        // getProjectFolder('default').projectTodo.push(newTask);
        // if (projectName && projectName != 'default') {
            getProjectFolder(projectName).projectTodo.push(newTask);
        // }
    }

    const getTask = (projectName, taskID) => {
        console.log(projectName);
        
        return getProjectFolder(projectName).projectTodo.find(task => task.id == taskID);
    }

    const updateTask = (taskID, currentProject, title, dueDate, project, priority, description = "") => {
        console.log(getProjectFolder(project))
        const task = getTask(currentProject, taskID);
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

        const defaultProject = getProjectFolder('default').projectTodo

        let taskToDelete = [];
        for(const task of defaultProject){
            if (task.project == projectName) taskToDelete.push(task);
        }

        taskToDelete.forEach(element => {
            removeTask(element);
        });
        
        const projectIndex = project.findIndex((project) => project.projectName == projectName)
        project.splice(projectIndex, 1);
    }
    
    

    const removeTask = (task) => {
        const projectFolder = project.find(projectFolder => projectFolder.projectName == task.project)
        // const defaultProject = project.find(projectFolder => projectFolder.projectName == 'default');
        const taskIndex = projectFolder.projectTodo.findIndex(item => item.id == task.id);
        // const defaultIndex = defaultProject.projectTodo.findIndex(item => item.id == task.id);
        // defaultProject.projectTodo.splice(defaultIndex, 1);
        projectFolder.projectTodo.splice(taskIndex, 1);
        
    }

    const moveTaskProject = (newProject, task) => {
        const currentProject = getProjectFolder(task.project);

        const taskIndex = currentProject.projectTodo.findIndex(item => item.id == task.id);

            currentProject.projectTodo.splice(taskIndex, 1);
            const projectDestination = getProjectFolder(newProject);
            projectDestination.projectTodo.push(task)

    

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