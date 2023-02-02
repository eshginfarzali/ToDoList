const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Load tasks from local storage
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
  taskList.innerHTML = storedTasks;
}

addTaskBtn.addEventListener("click", function(event) {
  event.preventDefault();
  const taskValue = taskInput.value;
  if (!taskValue) return;
  const task = document.createElement("li");
  task.innerHTML = `
    ${taskValue} 
    <i class="fas fa-pencil-alt edit-icon"></i>
    <i class="fas fa-times delete-icon"></i>
  `;
  task.addEventListener("click", function(event) {
    if (event.target.className === "fas fa-times delete-icon") {
      task.remove();
      localStorage.setItem("tasks", taskList.innerHTML);
    } else if (event.target.className === "fas fa-pencil-alt edit-icon") {
      const newValue = prompt("Edit task", taskValue);
      if (newValue) {
        task.innerHTML = `
          ${newValue} 
          <i class="fas fa-pencil-alt edit-icon"></i>
          <i class="fas fa-times delete-icon"></i>
        `;
        localStorage.setItem("tasks", taskList.innerHTML);
      }
    } else {
      task.style.textDecoration =
        task.style.textDecoration === "line-through" ? "" : "line-through";
    }
  });
  taskList.appendChild(task);
  taskInput.value = "";
  
  // Save tasks to local storage
  localStorage.setItem("tasks", taskList.innerHTML);
});
