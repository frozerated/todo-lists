// // index.js
import { Todo } from "./todo.js";
import {ScreenDisplay} from "./screen.js";
import "./style.css";
import "./modal.css";

const todo = Todo();
const screen = ScreenDisplay(todo);
screen.displayScreen();








