// // index.js
import { endOfToday, format, differenceInCalendarDays, addDays, getYear, setYear, formatDistanceToNow, isPast, endOfYesterday, compareAsc, } from "date-fns";
import { Todo } from "./todo.js";
import {ScreenDisplay} from "./screen.js";
import "./style.css";
import "./modal.css";



// make the todo accept existing projects
// - allow todo object to accept arguments
// - take those projects and import it to the todo object
//hence importing project to the todo module
// check for an existing data
// if no existing data apply default projects



const screen = ScreenDisplay(setProject());
screen.displayScreen();


function setProject(){
  
  if (!sessionStorage.getItem("todoProjects")) {
    const todo = Todo();
    setDefaultTodo(todo);
    console.log(todo.getProjects());
    const todoProjects = JSON.stringify(todo.getProjects());
    sessionStorage.setItem("todoProjects", todoProjects);
    return todo
  } else {
    const todoProjects = JSON.parse(sessionStorage.getItem("todoProjects"));
    const todo = Todo(todoProjects);
    return todo;
  }
}
  

function setDefaultTodo(todo){
    todo.addProject("STS");
    todo.addProject("IAS", '#8eccb6');


    //duedDate -> show different task state
    const dueDate = `${8}, ${8}, ${2026}`;
    const day1 = endOfToday(new Date());
    const day2 = endOfYesterday()
    const currentYear = getYear(new Date())
    const day3 = setYear(new Date(2005, 10, 25), currentYear);
    const day4 = addDays(new Date(), 3)

    //task creation
    todo.addTask('Task 1', 'Lorem Ipsum', day1, "STS", 'critical');
    todo.addTask('Task 2', '', day3, "default");
    todo.addTask('Task 3', 'Task 3 description', day2, 'IAS', 'minor');
    todo.addTask('Task 4', '', day4, 'IAS', 'significant');
    todo.addTask('Task 5', '', day4, 'STS', 'minor');

}







