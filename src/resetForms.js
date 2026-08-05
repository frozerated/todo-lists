import { endOfToday, format } from "date-fns";
import { taskModal, projectModal } from "./screen.js"

export function resetTaskForm() {

    taskModal.addEventListener('close', () => {
        taskModal.close();
        const taskForm = taskModal.querySelector('#add-task-form');
        taskForm.reset()
        const dueDate = taskForm.querySelector('#dueDate')
        dueDate.value = format(endOfToday(), 'yyyy-MM-dd') + 'T23:59';

    })
}

export function resetProjectForm(){
    projectModal.addEventListener('close', () => {
        projectModal.close();
        const projectForm = projectModal.querySelector('#project-form');
        const projectColor = projectForm.querySelector('#projectColor');
        projectForm.reset();
        
        projectColor.value = '#9d8df1';
    })
}