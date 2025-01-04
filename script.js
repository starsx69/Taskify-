const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearTasksBtn = document.createElement("button");
const taskCounter = document.createElement("p");
const filterSelect = document.createElement("select");
const taskDateInput = document.createElement("input");

clearTasksBtn.textContent = "Clear All Tasks";
clearTasksBtn.id = "clearTasksBtn";
taskCounter.id = "taskCounter";
filterSelect.id = "filterSelect";
taskDateInput.type = "date";
taskDateInput.id = "taskDateInput";

document.querySelector(".container").appendChild(taskCounter);
document.querySelector(".container").appendChild(clearTasksBtn);
document.querySelector(".container").appendChild(filterSelect);
document.querySelector(".container").appendChild(taskDateInput);

filterSelect.innerHTML = `
  <option value="all">All</option>
  <option value="completed">Completed</option>
  <option value="pending">Pending</option>
`;

const updateTaskCounter = () => {
  const tasks = document.querySelectorAll(".task-item");
  taskCounter.textContent = `Tasks: ${tasks.length}`;
};

const saveTasks = () => {
  const tasks = [...document.querySelectorAll(".task-item span")].map((task) => ({
    text: task.textContent,
    completed: task.parentElement.classList.contains("completed"),
    dueDate: task.parentElement.dataset.dueDate,
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => addTask(task.text, task.completed, task.dueDate));
};

const addTask = (taskText, completed = false, dueDate = null) => {
  if (!taskText.trim()) return;

  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");
  if (completed) taskItem.classList.add("completed");
  taskItem.dataset.dueDate = dueDate;

  taskItem.innerHTML = `
    <span>${taskText}</span>
    ${dueDate ? `<span class="due-date">${dueDate}</span>` : ""}
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
  addTask(taskInput.value, false, taskDateInput.value);
  taskInput.value = "";
  taskDateInput.value = "";
});

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask(taskInput.value, false, taskDateInput.value);
    taskInput.value = "";
    taskDateInput.value = "";
  }
});

clearTasksBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  saveTasks();
  updateTaskCounter();
});

filterSelect.addEventListener("change", (event) => {
  const filter = event.target.value;
  const tasks = document.querySelectorAll(".task-item");
  tasks.forEach((task) => {
    switch (filter) {
      case "completed":
        task.style.display = task.classList.contains("completed") ? "block" : "none";
        break;
      case "pending":
        task.style.display = !task.classList.contains("completed") ? "block" : "none";
        break;
      default:
        task.style.display = "block";
        break;
    }
  });
});

loadTasks();
updateTaskCounter();
