import { removeTodoFromSStorage } from "./sessionStorage";
import { toggleTodoCompleteStatusInSS } from "./sessionStorage";

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
    toggleTodoCompleteStatusInSS(
      findElementIndex(todoItem).index,
      findElementIndex(todoItem).element
    );
  };
}

export function toggleSelectActivation() {
  const select = document.querySelector(".todo-select");
  const todoItems = document.querySelector(".todo-list").children;

  if (todoItems.length) {
    select.disabled = false;
  } else {
    select.disabled = true;
    select.selectedIndex = 0;
  }
}

function findElementIndex(element) {
  let positionInList = 0;
  let todoItem = element;

  function findAllPreviousElements(todoItem) {
    if (todoItem.previousElementSibling) {
      console.log(todoItem.previousElementSibling);
      positionInList++;
      findAllPreviousElements(todoItem.previousElementSibling);
    }
  }

  findAllPreviousElements(todoItem);

  return {
    index: positionInList,
    element: todoItem,
  };
}
