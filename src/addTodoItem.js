import { removeTodoFromSStorage } from "./sessionStorage";
// import { saveTodoToSStorage } from ".sessionStorage";
// import { toggleSelectActivation } from "./index";

export const getTodoItem = (text) => {
  // Create Todo Item
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");

  // Create and add Todo Text
  const todoText = document.createElement("span");
  todoText.innerText = text;
  todoText.classList.add("todo-text");
  todoItem.appendChild(todoText);

  // Create and add Check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check"></i>';
  checkButton.classList.add("todo-check-button");
  checkButton.addEventListener("click", toggleCheckButton(todoItem));
  // checkButton.addEventListener("click", () => {
  //   if (checkButton.classList.contains("todo-item_completed")) {
  //     saveTodoToSStorage({
  //       item: todoItem,
  //       checked: false
  //     });
  //   } else {
  //     saveTodoToSStorage({
  //       item: todoItem,
  //       checked: false
  //     });
  //   }
  // });
  todoItem.appendChild(checkButton);

  // Create and add Remove button
  const removeButton = document.createElement("button");
  removeButton.innerHTML = '<i class="fas fa-trash"></i>';
  removeButton.classList.add("todo-remove-button");
  removeButton.addEventListener("click", removeTodoItem(todoItem));
  todoItem.appendChild(removeButton);

  return todoItem;
};

function removeTodoItem(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.classList.add("todo-item_fall");
    todoItem.addEventListener("transitionend", function () {
      removeTodoFromSStorage(todoItem);
      todoItem.remove();
      toggleSelectActivation();
    });
  };
}

function toggleCheckButton(todoItem) {
  return (e) => {
    e.preventDefault();
    todoItem.classList.toggle("todo-item_completed");
  };
}

export function toggleSelectActivation() {
  const select = document.querySelector(".todo-select");
  const todoItems = document.querySelector(".todo-list").children;

  todoItems.length ? (select.disabled = false) : (select.disabled = true);
}
