import { todoList } from "./todo.js";

export function ScreenDisplay(){
    const todo = todoList();
    const todoItems = todo.getItems();

    const taskDisplay = document.querySelector('.tasksContainer');
    const taskModal = document.querySelector('#task-modal');
    const openModal = document.querySelector('#open-modal');
    const closeModal = document.querySelector('#close-modal');
    
    // -- for testing purposes
    const dueDate = `${11}, ${25}, ${2005}`;

    todo.addTodo('Task 1', '', dueDate);
    todo.addTodo('Task 2', '', dueDate);
    todo.addTodo('Task 3', '', dueDate);
    //--


    const updateDisplay = () => {

        todoItems.forEach(element => {
            const itemContainer = document.createElement('div');
            itemContainer.classList = 'itemContainer';
            
    
            const title = document.createElement('p');
            title.classList = 'title';
            title.textContent = element['title'];
            itemContainer.appendChild(title);
            
            const dueDate = document.createElement('p');
            dueDate.textContent = element['dueDate'];
            dueDate.classList = 'dueDate';
            itemContainer.appendChild(dueDate);
    
            const completeButton = document.createElement('button');
            completeButton.classList = 'completeButton';
            itemContainer.appendChild(completeButton);
    
            taskDisplay.appendChild(itemContainer);
            
    
        });

    }


    
    openModal.addEventListener('click', (event) => {
        taskModal.showModal();
        

    });

    closeModal.addEventListener('click', (event)=>{
        taskModal.close();
    })
    const addTask = () =>{

    }


    return{
        updateDisplay,
    }


}