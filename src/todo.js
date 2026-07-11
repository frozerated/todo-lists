// Create list object
//List attributes: title, description, dueDate, priority
//Add lists to an array
//An array of objects of lists
import { format } from "date-fns";

function todoList() {
    let todoItems = [];
    let completedItems = [];


    const getItems = () => todoItems;
    const getCompleted = () => completedItems;

    const addTodo = (title, description, dueDate, project, priority) => {
        todoItems.push(todoItem(title, description, dueDate, project, priority,))
    }


    const markComplete = (title) => {
        todoItems.forEach((item, index) => {
            if (item['title'] == title) {
                const completed = todoItems.splice(index, (index + 1))

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
                todoItems.splice(index, (index + 1))
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

function todoItem(title, description = "", dueDate, project = 'default', priority = 'none') {

    dueDate = format(new Date(dueDate), 'MMM/dd/yyyy')
    return {
        title,
        description,
        dueDate,
        project,
        priority,
    }
}


export { todoList }