export const filterProjectTask = (projectName, todoItems) =>{
    return todoItems.filter(task => task['project'] == projectName);   
}