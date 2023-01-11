const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const todoItems = JSON.parse(localStorage.getItem("todos")) || [];
const completedItems = JSON.parse(localStorage.getItem("completed")) || [];

// Add a new todo item
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const todo = input.value;
  input.value = "";

  if (todo.length == 0) {
    alert("Please enter a todo item");
    return;
  }

  todoItems.push(todo);
  localStorage.setItem("todos", JSON.stringify(todoItems));


  location.reload();
});

// Remove a todo item when the delete button is clicked
ul.addEventListener("click", function (e) {
  if (e.target.id === "complete") {
    const index = e.target.dataset.index;
    const todo = todoItems.splice(index, 1);

    completedItems.push(todo[0]);
    localStorage.setItem("completed", JSON.stringify(completedItems));
    localStorage.setItem("todos", JSON.stringify(todoItems));
    location.reload()
  }
});

ul.addEventListener("click", function (e) {
  if (e.target.id === "delete") {
    const index = e.target.dataset.index;
    completedItems.splice(index, 1);

    localStorage.setItem("completed", JSON.stringify(completedItems));
    location.reload()
  }
});

const renderTodos = (ev) => {
  ev.preventDefault();
  ul.innerHTML = "";

  todoItems.forEach(function (todo, index) {
    const li = document.createElement("li");
    li.innerHTML = `${todo} <button data-index="${index}" class="btn btn-secondary" id="complete" ><i class="fa fa-x" id="complete"></i></button>`;
    li.setAttribute("class", "list-group-item");
    ul.appendChild(li);
  });
};

const renderCompletedTodos = (ev) => {
  ev.preventDefault;
  ul.innerHTML = "";
  completedItems.forEach(function (todo, index) {
    const li = document.createElement("li");
    li.innerHTML = `${todo} <button data-index="${index}" class="btn btn-secondary" id="delete"><i class="fa fa-x" id="delete"></i></button>`;
    li.setAttribute("class", "list-group-item completed");
    ul.appendChild(li);
  });
};

const renderAll = (ev) => {
  console.log("aici");
  ul.innerHTML = "";
  completedItems.forEach(function (todo, index) {
    const li = document.createElement("li");
    li.innerHTML = `${todo} <button data-index="${index}" class="btn btn-secondary" id="delete"><i class="fa fa-x" id="delete"></i></button>`;
    li.setAttribute("class", "list-group-item completed");
    ul.appendChild(li);
  });

  todoItems.forEach(function (todo, index) {
    const li = document.createElement("li");
    li.innerHTML = `${todo} <button data-index="${index}" class="btn btn-secondary" id="complete" ><i class="fa fa-x" id="complete"></i></button>`;
    li.setAttribute("class", "list-group-item");
    ul.appendChild(li);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-completed")
    .addEventListener("click", renderCompletedTodos);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-active").addEventListener("click", renderTodos);
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-all").addEventListener("click", renderAll);
});

renderAll();
