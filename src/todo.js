// Create list object
//List attributes: title, description, dueDate, priority
//Add lists to an array
//An array of objects of lists
import { format, endOfToday} from "date-fns";

function todoList() {
    let todoItems = [];
    let completedItems = [];


    const getItems = () => todoItems;
    const getCompleted = () => completedItems;

    const addTodo = (title, description, dueDate, project, priority) => {
        todoItems.push(todoItem(title, description, dueDate, project, priority,))
    }


    const markComplete = (id) => {
        todoItems.forEach((item, index) => {
            if (item['id'] == id) {
                const completed = todoItems.splice(index, 1)

                completedItems.push(completed[0]);
            }

        });
    }

    const changePriority = (title, newPriority) => {
        todoItems.forEach((item, index) => {
            if (item['title'] == title) {
                item['priority'] = newPriority;

            }

        });

    }

    const removeItem = (title) =>{
        todoItems.forEach((item, index)=>{
            if(item['title'] == title){
                todoItems.splice(index, 1)
            }

        });
    }


    return {
        getItems,
        addTodo,
        markComplete,
        getCompleted,
        changePriority,
        removeItem,
    }
}

function todoProjects(){
    let projectList = [];

    const getProjects = () => projectList;

    const addProject = (title) => {
        projectList.push(projectItem(title));
    }


    const addTask = (todoItems, projectName, taskID) => {
    
        let index = 0; //current project
        projectLoop: for(const project of projectList){
            if(project['projectName'] == projectName){
                for(const task of todoItems){
                    if(task["id"] == taskID){
                        projectList[index]["projectTodo"].push(task);
                        break projectLoop;
                    }
                }
            }else{
                index++ // to move to other project
            }
        }
    }

    const removeTask = (projectName, taskID) => {

        let index = 0;
        projectLoop: for(const project of projectList){
            if (project['projectName'] == projectName){
                const projectTask = projectList[index]['projectTodo'];
                
                for(const task of projectTask){
                    let taskIndex = 0;
                    if(task['id'] == taskID){                        
                        projectTask.splice(taskIndex, 1);
                        break projectLoop;
                    }
                    console.log("ex");
                }
            }
            index++
        }
    }



    return {
        getProjects,
        addProject,
        addTask,
        removeTask
    }
}

function projectItem(title){
    
    return {
        "projectName" : title,
        "projectTodo" : [],
    }
}


function todoItem(title, description = "", dueDate, project = 'default', priority = 'none') {

    dueDate = new Date(dueDate);
    const id = crypto.randomUUID().slice(1,15);

    return {
        id,
        title,
        description,
        dueDate,
        project,
        priority,
    }
}


export { todoList, todoProjects}