import {todo, todoItems,project, projectItems} from "./screen.js"
import {updateTaskDisplay} from "./screen.js"

export const addTask = () =>{
        const title = document.querySelector('#title').value;
        let dueDate = document.querySelector('#dueDate').value;
        const project = document.querySelector('#project').value;
        const priority = document.querySelector('#priority').value;
        const desc = document.querySelector('#desc').value;
        
        if(!dueDate) dueDate = endOfToday();
        
        todo.addTodo(title, desc, dueDate, project, priority)

    }

    