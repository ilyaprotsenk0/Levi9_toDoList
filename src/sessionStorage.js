const TODOS = "todos";

export function removeTodoFromSStorage(todoItem) {
  let todos = getTodosFromSStorage();

  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  if (todoText) {
    const filtredTodos = todos.filter((item) => {
      return item.value !== todoText.innerText;
    });
    sessionStorage.setItem(TODOS, JSON.stringify(filtredTodos));
  }
}

export function saveTodoToSStorage(todo) {
  let todos = getTodosFromSStorage();
  todos.push(todo);

  sessionStorage.setItem(TODOS, JSON.stringify(todos));
}

export function getTodosFromSStorage() {
  const storageTodos = sessionStorage.getItem(TODOS);
  return storageTodos ? JSON.parse(storageTodos) : [];
}

export function changeTodoItemActiveProperty(toDoItemIndex) {
  const savedTodos = getTodosFromSStorage();
  savedTodos.forEach((savedTodo, i) => {
    if (i === toDoItemIndex) {
      savedTodo.checked = true;
    }
  });
  sessionStorage.setItem(TODOS, JSON.stringify(savedTodos));
}

// 1. Продумать как изменять значение в SS на true/false
// 2. Продумать как отрисовывать при загрузке страницы с учетом значения checked
