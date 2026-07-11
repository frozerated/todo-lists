// Create list object
//List attributes: title, description, dueDate, priority
//Add lists to an array
//An array of objects of lists
import { format } from "date-fns";

function todoList(){
    let todoItems = [];

    const getItems = () => todoItems;

    const addTodo = (title, description, dueDate, project, priority) => {
        todoItems.push(todoItem(title, description, dueDate, project, priority,))
    }

    return{
        getItems,
        addTodo,
    }
}

function todoItem(title, description="", dueDate, project='default', priority='none'){

    dueDate = format(new Date(dueDate), 'MMM/dd/yyyy')
    return{
        title,
        description,
        dueDate,
        project,
        priority,
    }
}


const result = format(new Date('2025, 1, 25'), 'MM/dd/yyyy');

console.log(result);


export { todoList}