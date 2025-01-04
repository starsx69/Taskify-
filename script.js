const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearTasksBtn = document.createElement("button");
const taskCounter = document.createElement("p");

clearTasksBtn.textContent = "Clear All Tasks";
clearTasksBtn.id = "clearTasksBtn";
taskCounter.id = "taskCounter";
document.querySelector(".container").appendChild(taskCounter);
document.querySelector(".container").appendChild(clearTasksBtn);

const updateTaskCounter = () => {
  const tasks = document.querySelectorAll(".task-item");
  taskCounter.textContent = `Tasks: ${tasks.length}`;
};

const saveTasks = () => {
  const tasks = [...document.querySelectorAll(".task-item span")].map(
    (task) => ({ text: task.textContent, completed: task.parentElement.classList.contains("completed") })
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTask(task.text, task.completed));
};

const addTask = (taskText, completed = false) => {
  if (!taskText.trim()) return;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  if (completed) taskItem.classList.add("completed");

  taskItem.innerHTML = `
    <span>${taskText}</span>
    <button>Delete</button>
  `;

  taskItem.querySelector("span").addEventListener("click", () => {
    taskItem.classList.toggle("completed");
    saveTasks();
    updateTaskCounter();
  });

  taskItem.querySelector("button").addEventListener("click", () => {
    taskList.removeChild(taskItem);
    saveTasks();
    updateTaskCounter();
  });

  taskList.appendChild(taskItem);
  updateTaskCounter();
  saveTasks();
};

addTaskBtn.addEventListener("click", () => {
  addTask(taskInput.value);
  taskInput.value = "";
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask(taskInput.value);
    taskInput.value = "";
  }
});

clearTasksBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  saveTasks();
  updateTaskCounter();
});

loadTasks();
updateTaskCounter();
