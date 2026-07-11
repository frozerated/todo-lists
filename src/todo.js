// Create list object
//List attributes: title, description, dueDate, priority
//Add lists to an array
//An array of objects of lists

function todoList(){
    let todoItems = [];

    const getItems = () => todoItems;

    const addTodo = (title, description, dueDate, priority) => {
        todoItems.push(todoItem(title, description, dueDate, project, priority,))
    }

    return{
        getItems,
        addTodo,
    }
}

function todoItem(title, description, dueDate, project='default', priority='none'){
    return{
        title,
        description,
        dueDate,
        projects,
        priority,
    }
}



export { todoList}