import { endOfToday, format } from "date-fns";
import { todoList, todoProjects } from "./todo.js";

export function ScreenDisplay(){
    const todo = todoList();
    const todoItems = todo.getItems();
    const project = todoProjects();
    const projectItems = project.getProjects();

    const taskDisplay = document.querySelector('.tasksContainer');
    const projectDisplay = document.querySelector('.projectContainer');
    
    const taskModal = document.querySelector('#task-modal');
    const openModal = document.querySelector('#open-modal');
    const closeModal = document.querySelector('.close-modal');

    const addTaskButton = document.querySelector('#addTask');
    const taskForm = document.querySelector('#task-form')

    const addProjectButton = document.querySelector("#addProject");
    
    // -- for testing purposes
    const dueDate = `${11}, ${25}, ${2005}`;

    todo.addTodo('Task 1', '', dueDate);
    todo.addTodo('Task 2', '', dueDate);
    todo.addTodo('Task 3', '', dueDate);
    //--

    const dueDateSetDefault = document.querySelector('#dueDate');
    dueDateSetDefault.value = format(endOfToday(), 'yyyy-MM-dd') + 'T23:59'

    
    const displayScreen = () =>{
        updateTaskDisplay();
        displayProjects();
    }

    const updateTaskDisplay = () => {
        displayTasks(taskDisplay, todoItems);
    }
    
    const displayTasks = (displayArea, itemList) => {
        taskDisplay.textContent = "";
        itemList.forEach(element => {
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
            completeButton.id = element['id']
            completeButton.addEventListener('click', markComplete)
            itemContainer.appendChild(completeButton);
    
            displayArea.appendChild(itemContainer);
    
            
    
        });
        
        
        
    }


    const displayProjects = () => {
        projectDisplay.textContent = ""
        // let index = 0;
        for(const item of projectItems){
            console.log(item['projectName']);
                
            const projectName = document.createElement('button');
            projectName.textContent = '# ' + item['projectName'];
            projectName.classList = "projectName";
            projectDisplay.appendChild(projectName);

            // index++;
        }
    }


    
    openModal.addEventListener('click', (event) => {
        // taskModal.showModal();
    });
    closeModal.addEventListener('click', (event)=>{
        taskModal.close();
    })

    addTaskButton.addEventListener('click', (event)=>{
        addTask();
    });

    addProjectButton.addEventListener('click', (event) =>{
        addProject();
    })





    const addTask = () =>{
        const title = document.querySelector('#title').value;
        let dueDate = document.querySelector('#dueDate').value;
        const project = document.querySelector('#project').value;
        const priority = document.querySelector('#priority').value;
        const desc = document.querySelector('#desc').value;
        
        if(!dueDate) dueDate = endOfToday();
        
        todo.addTodo(title, desc, dueDate, project, priority)
        updateTaskDisplay();

    }

    const addProject = ()=>{
        const projectName = document.querySelector("#projectName").value;
        const projectColor =document.querySelector("#projectColor").value;

        project.addProject(projectName);
        displayProjects();

    }

    const markComplete = (event) => {
    
        todo.markComplete(event.target.id);
        updateTaskDisplay();
        console.log("---- Todo After: ");
        
        console.log(todo.getItems());
        console.log("---- Completed : ");
        
        console.log(todo.getCompleted());
        
        
    
    }


    // Testing purposes
    project.addProject("STS");
    project.addProject("IAS");
    todo.addTodo("tite", '', dueDate)
    project.addTask(todoItems, "IAS", todo.getItems()[1]['id'])
    project.addTask(todoItems, "IAS", todo.getItems()[2]['id'])
    project.addTask(todoItems, "STS", todo.getItems()[0]['id'])
    console.log(project.getProjects());
    project.removeTask("IAS", todo.getItems()[2]['id']);        
    console.log(project.getProjects());
    
    

    // project.addTask("STS", "any", "any")
    // console.log(todo.getItems());
    // project.addTask(todo.getItems());
    


    return{
        displayScreen,
    }
    
}
