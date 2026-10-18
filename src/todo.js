import { format, endOfToday } from "date-fns";


export function Todo(project = []) {

    const saveChanges = () => {
        const projects = JSON.stringify(getProjects());
        sessionStorage.setItem("todoProjects", projects);
    }

    const getProjects = () => project;
    const addProject = (title, color) => {
        project.push(projectItem(title, color));
        saveChanges();
    }

    if (project.length == 0) {
        addProject('default');
    }

    const getProjectFolder = (projectName) => {
        return project.find(project => project.projectName == projectName);
    }

    const addTask = (title, description, dueDate, projectName, priority) => {

        const newTask = todoItem(title, description, dueDate, projectName, priority);

        getProjectFolder(projectName).projectTodo.push(newTask);
        saveChanges();

    }

    const getTask = (projectName, taskID) => {
        return getProjectFolder(projectName).projectTodo.find(task => task.id == taskID);
    }

    const updateTask = (taskID, currentProject, title, dueDate, project, priority, description = "") => {
        const task = getTask(currentProject, taskID);

        if (task) {
            if (currentProject != project) {
                moveTaskProject(project, task);
            }
            Object.assign(task, {
                title,
                dueDate,
                project,
                priority,
                description,
            })

            saveChanges();

        }
    }

    const removeProject = (projectName) => {
        if (projectName == "default") return;
        const defaultProject = getProjectFolder('default').projectTodo

        let taskToDelete = [];
        for (const task of defaultProject) {
            if (task.project == projectName) taskToDelete.push(task);
        }

        taskToDelete.forEach(element => {
            removeTask(element, true);
        });

        const projectIndex = project.findIndex((project) => project.projectName == projectName)
        project.splice(projectIndex, 1);

        saveChanges();
    }



    const removeTask = (task, skipSave) => {

        const projectFolder = project.find(projectFolder => projectFolder.projectName == task.project)
        const taskIndex = projectFolder.projectTodo.findIndex(item => item.id == task.id);
        projectFolder.projectTodo.splice(taskIndex, 1);

        if(!skipSave){
            saveChanges();
        }

    }

    const moveTaskProject = (newProject, task) => {

        const currentProject = getProjectFolder(task.project);
        const taskIndex = currentProject.projectTodo.findIndex(item => item.id == task.id);
        currentProject.projectTodo.splice(taskIndex, 1);
        const projectDestination = getProjectFolder(newProject);
        projectDestination.projectTodo.push(task);

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

function projectItem(title, color = '#457B9D') {
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