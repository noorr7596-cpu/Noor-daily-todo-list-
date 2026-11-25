let taskName = "Design Social Media Post";

console.log(taskName);
let category = "Graphic Design";

console.log(category);
const priority = "High";

console.log(priority);
let taskStatus = "Pending";

console.log(taskStatus);

taskStatus = "Completed";

console.log(taskStatus);
const taskTitleInput = document.getElementById("task-title");

const categoryInput = document.getElementById("category");

const priorityInput = document.getElementById("priority");

const dueDateInput = document.getElementById("due-date");
console.log(taskTitleInput);
console.log(categoryInput);
console.log(priorityInput);
console.log(dueDateInput);
console.log("JavaScript Connected Successfully!");
const taskForm = document.getElementById("task-form");
console.log(taskForm);
let tasks = [];
function saveTasks() {
    function loadTasks() {
    const savedTasks = localStorage.getItem("myTasks");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }
}
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = taskTitleInput.value;
    const category = categoryInput.value;
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    const task = {
        title: title,
        category: category,
        priority: priority,
        dueDate: dueDate,
        completed: false
    };

    tasks.push(task);
    saveTasks();
taskForm.reset();
    console.log(tasks);
    console.log("Total Tasks:", tasks.length);
displayTasks();
});
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search-task");
const filterButtons = document.querySelectorAll("[data-filter]");
const totalTasksElement = document.getElementById("total-tasks");
const pendingTasksElement = document.getElementById("pending-tasks");
const completedTasksElement = document.getElementById("completed-tasks");
const dueTodayTasksElement = document.getElementById("due-today-tasks");
const progressPercentage = document.getElementById("progress-percentage");
const progressFill = document.getElementById("progress-fill");
function displayTasks(taskArray = tasks) {

    taskList.innerHTML = "";
totalTasksElement.textContent = tasks.length;
pendingTasksElement.textContent = tasks.filter(function(task) {
    return task.completed === false;
}).length;
completedTasksElement.textContent = tasks.filter(function(task) {
    return task.completed === true;
}).length;
let progress = 0;

if (tasks.length > 0) {
    progress = Math.round(
        (tasks.filter(function(task) {
            return task.completed === true;
        }).length / tasks.length) * 100
    );
}

progressPercentage.textContent = progress + "%";
progressFill.style.width = progress + "%";
const today = new Date().toLocaleDateString("en-CA");

dueTodayTasksElement.textContent = tasks.filter(function(task) {
    return task.dueDate === today;
}).length;
    taskArray.forEach(function(task) {

        taskList.innerHTML += `
    <div class="task-item">

        <input
    type="checkbox"
    ${task.completed ? "checked" : ""}
    onchange="toggleTask(${tasks.indexOf(task)})"
>

        <div class="task-info ${task.completed ? "completed" : ""}">
            <h3>${task.title}</h3>
            <p>${task.category} | Due: ${task.dueDate}</p>
        </div>

        <span class="priority ${task.priority}">
            ${task.priority}
        </span>
<div class="task-actions">

    <button onclick="editTask(${tasks.indexOf(task)})">
        Edit
    </button>

    <button onclick="deleteTask(${tasks.indexOf(task)})">
        Delete
    </button>

</div>
    </div>
`;

    });

}
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredTasks = tasks.filter(function(task) {

        return task.title.toLowerCase().includes(searchText);

    });

    displayTasks(filteredTasks);

});
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}
function editTask(index) {

    const newTitle = prompt("Enter new task title:");

    if (newTitle !== null && newTitle.trim() !== "") {

        tasks[index].title = newTitle;
saveTasks();
        displayTasks();

    }

}
filterButtons[0].classList.add("active");
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
    btn.classList.remove("active");
});

button.classList.add("active");

        const filter = button.dataset.filter;

        let filteredTasks = tasks;

        if (filter === "pending") {
            filteredTasks = tasks.filter(function(task) {
                return task.completed === false;
            });
        }

        else if (filter === "completed") {
            filteredTasks = tasks.filter(function(task) {
                return task.completed === true;
            });
        }

        else if (filter === "today") {
            const today = new Date().toISOString().split("T")[0];

            filteredTasks = tasks.filter(function(task) {
                return task.dueDate === today;
            });
        }

        displayTasks(filteredTasks);

    });

});
loadTasks();
displayTasks();