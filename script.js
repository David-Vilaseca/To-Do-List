const addTaskBtn = document.getElementById("add-task");
const inputTask = document.querySelector(".input-task");
const taskContainer = document.querySelector(".task-container");

let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
}

function showTasks() {
    taskContainer.querySelectorAll(".task").forEach(t => t.remove());
    tasksList.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.className = "input-task";
        taskInput.value = task;
        taskInput.readOnly = true;

        const editBtn = document.createElement("button");
        editBtn.className = "material-symbols-outlined";
        editBtn.id = "edit-task";
        editBtn.textContent = "edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "material-symbols-outlined";
        deleteBtn.id = "delete-task";
        deleteBtn.textContent = "delete";

        editBtn.addEventListener("click", () => {
            if (taskInput.readOnly) {
                taskInput.readOnly = false;
                taskInput.focus();
                editBtn.textContent = "check";
            } else {
                taskInput.readOnly = true;
                tasksList[index] = taskInput.value.trim();
                saveTasks();
                editBtn.textContent = "edit";
            }
        });

        deleteBtn.addEventListener("click", () => {
            tasksList.splice(index, 1);
            saveTasks();
            showTasks();
        });

        taskDiv.appendChild(taskInput);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(deleteBtn);
        taskContainer.appendChild(taskDiv);
    });
}

addTaskBtn.addEventListener("click", () => {
    const taskText = inputTask.value.trim();
    if (taskText === "") return;

    tasksList.push(taskText);
    saveTasks();
    showTasks();
    inputTask.value = "";
});

window.addEventListener("load", showTasks);
