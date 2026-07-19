import { endOfToday, format } from "date-fns";
import { Todo } from "./todo.js";
import { filterProjectTask } from "./projectDisplay.js";



export function ScreenDisplay() {
    const todo = Todo();


    const taskDisplay = document.querySelector('.tasksContainer');
    const projectDisplay = document.querySelector('.projectContainer');

    const addTaskButton = document.querySelector('#addTask');
    const taskForm = document.querySelector('#task-form');

    const addProjectButton = document.querySelector("#addProject");



    const dueDateSetDefault = document.querySelector('#dueDate');
    dueDateSetDefault.value = format(endOfToday(), 'yyyy-MM-dd') + 'T23:59'



    const displayScreen = () => {
        updateTaskDisplay();
        displayProjects();
    }

    const updateTaskDisplay = () => {
        console.log(todo.getProjectFolder('default').projectTodo);
        console.log(todo.getProjects());
        
        displayTasks(taskDisplay, todo.getProjectFolder('default').projectTodo)

    }

    const displayTasks = (displayArea, itemList) => {
        taskDisplay.textContent = "";
        itemList.forEach(element => {
            const itemContainer = document.createElement('div');
            itemContainer.classList = 'itemContainer';

            const title = document.createElement('button');
            title.classList = 'title';
            title.textContent = element['title'];
            title.id = element['id'];

            title.addEventListener('click', (event) => {
                openTaskDetails(event.target.id)
                
            })

            itemContainer.appendChild(title);

            const dueDate = document.createElement('p');
            dueDate.textContent = format(element['dueDate'], 'E, MMM dd p ');
            dueDate.classList = 'dueDate';
            itemContainer.appendChild(dueDate);

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

        const task = todo.getTask(taskID)


        const allTaskContainer = document.querySelector('.main')
        const taskDetailModal = document.createElement('dialog');
        const taskDetailForm = document.createElement('form');

        taskDetailForm.id = 'task-update-detail'

        const taskName = document.createElement('input');
        taskName.value = task['title']
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

            taskDetailForm.textContent = '';
            taskDetailModal.textContent = '';
            taskDetailModal.close()
            console.log(todo.getProjects());


            updateTaskDisplay();
        })


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
        const showAllTask = document.createElement('button');
        showAllTask.textContent = 'All Task'
        showAllTask.classList = 'button project'
        showAllTask.addEventListener('click', event => displayTasks(taskDisplay, todoItems))
        projectDisplay.appendChild(showAllTask);

        for (const item of todo.getProjects()) {

            const projectName = document.createElement('button');
            projectName.textContent = '# ' + item['projectName'];
            projectName.classList = "projectName";
            projectName.id = item.projectName;
            projectName.addEventListener('click', (event) => {
                const projectTodo = todo.getProjectFolder(event.target.id).projectTodo
                displayTasks(taskDisplay, projectTodo)
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
        addProject();
    })





    const addTask = () => {
        const title = document.querySelector('#title').value;
        let dueDate = document.querySelector('#dueDate').value;
        const project = document.querySelector('#project').value;
        const priority = document.querySelector('#priority').value;
        const desc = document.querySelector('#desc').value;

        if (!dueDate) dueDate = endOfToday();

        todo.addTask(title, desc, dueDate, project, priority)

        updateTaskDisplay();

    }

    const addProject = () => {
        const projectName = document.querySelector("#projectName").value;
        const projectColor = document.querySelector("#projectColor").value;

        project.addProject(projectName);
        displayProjects();

    }

    const markComplete = (event) => {

        todo.removeTask(todo.getTask(event.target.id));
        // todo.markComplete(event.target.id);
        // console.log(projectItems);
        // console.log(todoItems);
        updateTaskDisplay();




    }




    // Testing purposes
    todo.addProject("STS");
    todo.addProject("IAS");


        // -- for testing purposes
    const dueDate = `${11}, ${25}, ${2005}`;

    todo.addTask('Task 1', '', dueDate, "STS");
    todo.addTask('Task 2', '', dueDate);
    todo.addTask('Task 3', '', dueDate);
    console.log(todo.getProjects());
    
    //--
    // todo.addTodo("tite", '', dueDate)
    // project.addTask(todoItems, "IAS", todo.getItems()[1])
    // project.addTask(todoItems, "IAS", todo.getItems()[2])
    // project.addTask(todoItems, "STS", todo.getItems()[0])


    // project.removeTask("IAS", todo.getItems()[2]['id']);        
    // console.log(projectItems);




    return {
        displayScreen,
    }

}