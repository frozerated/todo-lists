import { endOfToday, format } from "date-fns";
import { Todo } from "./todo.js";
import { filterProjectTask } from "./projectDisplay.js";
import { resetProjectForm, resetTaskForm } from "./resetForms.js";

export{taskModal, projectModal}
const taskModal = document.querySelector('#task-modal')
const projectModal = document.querySelector('#project-modal')

export function ScreenDisplay() {
    resetTaskForm();
    resetProjectForm();
    const todo = Todo();
    
    const taskForm = taskModal.querySelector('#task-form');
    const projectForm = projectModal.querySelector('#project-form')

    const taskDisplay = document.querySelector('.tasksContainer');
    taskDisplay.id = "default"
    const projectDisplay = document.querySelector('.projectContainer');

    const addTaskButton = document.querySelector('#addTask');

    const addProjectButton = document.querySelector("#addProject");

    const dueDateSetDefault = document.querySelector('#dueDate');
    dueDateSetDefault.value = format(endOfToday(), 'yyyy-MM-dd') + 'T23:59'
    
    const projectColorDefault = document.querySelector('#projectColor');
    projectColorDefault.value ='#9d8df1'

    const displayScreen = () => {
        updateTaskDisplay();
        displayProjects();
    }

    const updateTaskDisplay = (projectName="default") => {  
        displayTasks(taskDisplay, todo.getProjectFolder(projectName).projectTodo)

    }


    const displayTasks = (displayArea, itemList) => {
        taskDisplay.textContent = "";
        itemList.forEach(element => {
            const itemContainer = document.createElement('div');
            itemContainer.classList = `itemContainer ${element.priority.toLowerCase()}`

            const title = document.createElement('button');
            title.classList = 'title';
            title.textContent = element['title'];
            title.id = element['id'];

            title.addEventListener('click', (event) => {
                openTaskDetails(event.target.id)

            })

            
            const dueDate = document.createElement('p');
            dueDate.textContent = format(element['dueDate'], 'E, MMM dd p ');
            dueDate.classList = 'dueDate';
            
            const titleAndDueDate = document.createElement('div')
            titleAndDueDate.appendChild(title);
            titleAndDueDate.appendChild(dueDate);
            itemContainer.appendChild(titleAndDueDate);

            const taskProject = document.createElement('p')
            taskProject.textContent = element.project;
            itemContainer.appendChild(taskProject)

            const completeButton = document.createElement('button');
            completeButton.textContent = "Done"
            completeButton.classList = 'completeButton';

            completeButton.id = element['id']
            completeButton.addEventListener('click', markComplete)
            itemContainer.appendChild(completeButton);

            displayArea.appendChild(itemContainer);



        });



    }
    
    const openTaskDetails = (taskID) => {
        const allTaskContainer = document.querySelector('.main')
        const taskDetailModal = document.createElement('dialog');
        const taskDetailForm = document.createElement('form');
        const task = todo.getTask(taskID)
        console.log(taskID);

        taskDetailForm.reset();
        taskDetailForm.id = 'task-update-detail'


        const taskName = document.createElement('input');
        taskName.value = task['title'];
        taskName.id = 'title'
        taskDetailForm.appendChild(taskName);

        const dueDate = document.createElement('input')
        dueDate.type = 'datetime-local'
        dueDate.value = format(task['dueDate'], 'yyyy-MM-dd') + 'T23:59'
        dueDate.id = 'dueDate'
        taskDetailForm.appendChild(dueDate)


        const project = document.createElement("select");
        project.id = "projectInput";

        for (const item of todo.getProjects()) {
            const option = document.createElement('option');
            option.value = item['projectName'];
            option.textContent = item['projectName']

            if (option.value == task['project']) {
                option.selected = true;

            }
            project.appendChild(option);
        }


        const projectLabel = document.createElement('label')
        projectLabel.htmlFor = 'projectInput';
        projectLabel.textContent = 'Project: '
        taskDetailForm.appendChild(projectLabel);
        taskDetailForm.appendChild(project)


        const priorityLabel = document.createElement('label')
        priorityLabel.htmlFor = 'priorityInput';
        priorityLabel.textContent = 'Priority: '
        taskDetailForm.appendChild(priorityLabel);


        const selectPriority = document.createElement('select')
        selectPriority.id = 'priorityInput'


        for (const priority of ['Critical', 'Significant', 'Minor']) {
            const option = document.createElement('option');
            option.value = priority;
            option.textContent = priority


            if (option.value.toLowerCase() == task['priority']) {
                option.selected = true;
            }
            selectPriority.appendChild(option)
        }

        taskDetailForm.appendChild(selectPriority);

        const description = document.createElement('textarea');
        description.value = task['description'];
        description.id = 'description'
        taskDetailForm.appendChild(description)


        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.type = 'submit';
        saveButton.addEventListener('click', event => {
            event.preventDefault();
            updateTaskDetails(taskID)
            updateTaskDisplay();
            taskDetailModal.close()
            taskDetailModal.remove();

        })

        taskDetailModal.addEventListener('close', () => {
            taskDetailModal.remove();
        });

        taskDetailForm.appendChild(saveButton)
        taskDetailModal.appendChild(taskDetailForm)
        allTaskContainer.appendChild(taskDetailModal)
        taskDetailModal.showModal();
    }

    const updateTaskDetails = (taskID) => {
        const updateForm = document.querySelector('#task-update-detail')
        const title = updateForm.querySelector('#title').value
        const dueDate = updateForm.querySelector('#dueDate').value;
        const project = updateForm.querySelector('#projectInput').value
        const priority = updateForm.querySelector('#priorityInput').value
        const description = updateForm.querySelector('#description').value



        todo.updateTask(taskID, title, dueDate, project, priority, description);
    }


    const displayProjects = () => {
        projectDisplay.textContent = ""


        for (const item of todo.getProjects()) {

            const projectName = document.createElement('button');
            projectName.classList = "projectName";
            projectName.textContent = '# ' + item['projectName'];

            projectName.style.backgroundColor = item.color
            
            if(item.projectName == 'default') projectName.textContent = 'All Task'
            projectName.id = item.projectName;
            projectName.addEventListener('click', (event) => {
                const projectTodo = todo.getProjectFolder(event.target.id).projectTodo
                taskDisplay.id = item.projectName;

                updateTaskDisplay(event.target.id)
            })
            
            projectDisplay.appendChild(projectName);
        }
        
        const projectOption = taskForm.querySelector('#project')
        projectOption.textContent = '';
        for (const item of todo.getProjects()) {

            const option = document.createElement('option');
            option.value = item['projectName'];
            option.textContent = item['projectName']
            projectOption.appendChild(option);
        }

    }



    addTaskButton.addEventListener('click', (event) => {

        addTask();

    });

    addProjectButton.addEventListener('click', (event) => {
            // event.preventDefault();
        addProject();

    })





    const addTask = () => {

        const title = document.querySelector('#title').value;
        let dueDate = document.querySelector('#dueDate').value;
        const project = document.querySelector('#project').value;
        const priority = document.querySelector('#priority').value;
        const desc = document.querySelector('#desc').value;

        if (!dueDate) dueDate = endOfToday();

        todo.addTask(title, desc, dueDate, project, priority);

        let display = taskDisplay.id;
        if(display != 'default'){
            display = project;
        }

        updateTaskDisplay(display);
        
    }

    const addProject = () => {
        const projectName = document.querySelector("#projectName");
        const projectColor = document.querySelector("#projectColor");        
        
        todo.addProject(projectName.value,  projectColor.value);
        displayProjects();

        
    }

    const markComplete = (event) => {
        todo.removeTask(todo.getTask(event.target.id));
        updateTaskDisplay(taskDisplay.id);
    }




    // Testing purposes
    todo.addProject("STS");
    todo.addProject("IAS");


    // -- for testing purposes
    const dueDate = `${11}, ${25}, ${2005}`;

    todo.addTask('Task 1', '', dueDate, "STS");
    todo.addTask('Task 2', '', dueDate);
    todo.addTask('Task 3', '', dueDate, 'IAS')



    return {
        displayScreen,
    }

}