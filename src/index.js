// // index.js
import { todoList } from "./todo.js";

// console.log(todoList);

const todo = todoList();
const month = prompt('Month Deadline')
const day = prompt('Day Deadline')
const year = prompt('Year Deadline')
const dueDate = `${month}, ${day}, ${year}`

todo.addTodo('Task 1', '', dueDate)
console.log(todo.getItems());



