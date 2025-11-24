"use strict";
const todoValue = document.querySelector(".todo-value");
const addTodo = document.querySelector(".add-todo");
const clearTodos = document.querySelector(".clear-todos");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-count");
const countSpan = document.querySelector(".count-span");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");
const handleSubmit = (event) => {
    event.preventDefault();
    // Validation: جلوگیری از تسک خالی
    const title = todoValue.value.trim();
    if (!title) {
        // نمایش پیام خطا یا تغییر استایل
        todoValue.style.borderColor = "#ff6b6b";
        todoValue.placeholder = "Please enter a task!";
        setTimeout(() => {
            todoValue.style.borderColor = "";
            todoValue.placeholder = "add you new todo";
        }, 2000);
        return;
    }
    const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        isComplete: false,
    };
    attd(newTodo);
    todos.push(newTodo);
    stil();
    updateAllUI();
    todoValue.value = "";
    todoValue.focus();
};
const handleUpdatecounter = () => {
    if (todoCount) {
        todoCount.innerHTML = todos.length.toString();
    }
};
const handleUpdateUi = () => {
    if (todos.length === 0) {
        countSpan.innerHTML = `you dont have any tasks`;
    }
    else {
        countSpan.innerHTML = `you have <span class="todo-count">${todos.length}</span> pending tasks`;
    }
};
const updateAllUI = () => {
    handleUpdateUi();
    handleUpdatecounter();
};
const attd = (todo) => {
    const completedClass = todo.isComplete ? "completed" : "";
    const completeIcon = todo.isComplete ? "fa-undo" : "fa-check";
    todoList.insertAdjacentHTML("beforeend", `
      <li class="${completedClass}">
            <span class="todo-text">${todo.title}</span>
            <span class="icon complete-icon" onclick="completeTodo('${todo.id}')">
              <i class="fas ${completeIcon}"></i>
            </span>
            <span class="icon delete-icon" onclick="removeTodo('${todo.id}')">
              <i class="fas fa-trash"></i>
            </span>
      </li>
    `);
};
const stil = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
const removeTodo = (todoId) => {
    todos = todos.filter((todo) => todo.id !== todoId);
    stil();
    todoList.innerHTML = "";
    todos.forEach((todo) => attd(todo));
    updateAllUI();
};
const completeTodo = (todoId) => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
        todo.isComplete = !todo.isComplete; // toggle وضعیت complete
        stil();
        todoList.innerHTML = "";
        todos.forEach((todo) => attd(todo));
        updateAllUI();
    }
};
addTodo.addEventListener("click", (event) => handleSubmit(event));
window.addEventListener("DOMContentLoaded", () => {
    updateAllUI();
    todos.forEach((todo) => attd(todo));
});
clearTodos.addEventListener("click", () => {
    todoList.innerHTML = "";
    todos = [];
    stil();
    updateAllUI();
});
todoValue.addEventListener("keydown", (event) => {
    if (event.key === " " && todoValue.value === "") {
        event.preventDefault();
    }
});
todoValue.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleSubmit(event);
    }
});
//# sourceMappingURL=index.js.map