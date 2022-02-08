import "../styles/index.css";
import "../index.html";

import { getTodoItem } from "./addTodoItem";
import { saveTodoToSStorage, getTodosFromSStorage } from "./sessionStorage";
import { filterTodoItems } from "./filterTodoItems";
import { toggleSelectActivation } from "./addTodoItem";
import {
  clearTodoInput,
  getTodoInputItems,
  validateTodoInput,
} from "./todoInput";

const { todoInput, todoButton } = getTodoInputItems();
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");
const todoHelper = document.querySelector(".todo-helper");

document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", validateTodoInput);
todoInput.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    if (validateTodoInput()) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
});
todoInput.addEventListener("focus", () => {
  if (!validateTodoInput()) {
    todoHelper.classList.add("todo-helper_visible");
  }
});
todoInput.addEventListener("blur", () => {
  todoHelper.classList.remove("todo-helper_visible");
});
todoButton.addEventListener("click", addTodo);
todoSelect.addEventListener("change", filterTodos);

function onDOMLoaded() {
  renderTodosFromSStorage();
  toggleSelectActivation();
}

function renderTodosFromSStorage() {
  let todos = getTodosFromSStorage();

  todos.forEach((todo) => {
    const todoItem = getTodoItem(todo.value);
    todoList.appendChild(todoItem);

    if (todo.checked) {
      todoItem.classList.add("todo-item_completed");
    }
  });
}

function addTodo(event) {
  event.preventDefault();

  const todoItem = getTodoItem(todoInput.value);
  todoList.appendChild(todoItem);

  toggleSelectActivation();

  saveTodoToSStorage({
    value: todoInput.value,
    checked: false,
  });

  clearTodoInput();
}

function filterTodos(e) {
  const todoItems = todoList.childNodes;

  filterTodoItems(todoItems, e.target.value);
}

// TODO fix bugs:
// 1. select should be disabled when no option is displayed
// 2. forbid form submit with enter key, when input value is less than 3 characters
// 3. when todoInput is not in focus, helper text should not be displayed
// 4. save to session storage todo state: completed, not completed - and update it
