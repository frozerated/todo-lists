import { todoList } from "./todo.js";

export function ScreenDisplay(){
    const todo = todoList();
    const todoItems = todo.getItems();

    const taskDisplay = document.querySelector('.main')

    // -- for testing purposes
    const dueDate = `${11}, ${25}, ${2005}`;

    todo.addTodo('Task 1', '', dueDate);
    todo.addTodo('Task 2', '', dueDate);
    todo.addTodo('Task 3', '', dueDate);
    //--


    todoItems.forEach(element => {
        const itemContainer = document.createElement('div');
        itemContainer.classList = 'itemContainer';
        taskDisplay.appendChild(itemContainer)

        

    });


}