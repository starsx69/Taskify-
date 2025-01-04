
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }


  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");


  taskItem.innerHTML = `
    <span>${taskText}</span>
    <button>Delete</button>
  `;


  taskItem.querySelector("span").addEventListener("click", () => {
    taskItem.classList.toggle("completed");
  });


  taskItem.querySelector("button").addEventListener("click", () => {
    taskList.removeChild(taskItem);
  });

  taskList.appendChild(taskItem);


  taskInput.value = "";
});
