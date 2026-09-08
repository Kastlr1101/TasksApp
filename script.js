let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
let editIndex = null;

// -------------------------
// DARK / LIGHT MODE SYSTEM
// -------------------------

const modeBtn = document.getElementById("modeBtn");

function applyMode(mode) {
    if (mode === "dark") {
        document.body.classList.add("dark");
        modeBtn.textContent = "Light Mode";
    } else {
        document.body.classList.remove("dark");
        modeBtn.textContent = "Dark Mode";
    }
    localStorage.setItem("mode", mode);
}

applyMode(localStorage.getItem("mode") || "light");

modeBtn.addEventListener("click", () => {
    const newMode = document.body.classList.contains("dark") ? "light" : "dark";
    applyMode(newMode);
});

// -------------------------
// PLUS BUTTON TOGGLE FORM
// -------------------------

const plusBtn = document.getElementById("plusBtn");
const taskForm = document.getElementById("taskForm");

plusBtn.addEventListener("click", () => {
    taskForm.classList.toggle("show");
});

// -------------------------
// TASK SYSTEM
// -------------------------

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const item = document.createElement("div");
        item.className = "task-item";

        item.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Notizen:</strong> ${task.notes}</p>
            <p>Priorität: <strong>${task.priority}</strong></p>
            <p>Verantwortlich: <strong>${task.assigned}</strong></p>
            <p>Datum: <strong>${task.date}</strong></p>

            <div class="task-buttons">
                <button class="done-btn">Erledigt</button>
                <button class="edit-btn">Bearbeiten</button>
                <button class="delete-btn">Löschen</button>
            </div>
        `;

        // Buttons
        item.querySelector(".delete-btn").onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        item.querySelector(".done-btn").onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        };

        item.querySelector(".edit-btn").onclick = () => openEditPopup(index);

        taskList.appendChild(item);
    });
}

renderTasks();

function addTask() {
    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        notes: document.getElementById("notes").value,
        priority: document.getElementById("priority").value,
        assigned: document.getElementById("assigned").value,
        date: document.getElementById("date").value
    };

    if (!task.title || !task.assigned || !task.date) {
        alert("Bitte mindestens Titel, Verantwortlichen und Datum eingeben.");
        return;
    }

    tasks.push(task);
    saveTasks();
    renderTasks();

    taskForm.classList.remove("show");
}

// -------------------------
// EDIT POPUP
// -------------------------

const editPopup = document.getElementById("editPopup");

function openEditPopup(index) {
    editIndex = index;
    const task = tasks[index];

    document.getElementById("editTitle").value = task.title;
    document.getElementById("editDescription").value = task.description;
    document.getElementById("editNotes").value = task.notes;
    document.getElementById("editPriority").value = task.priority;
    document.getElementById("editAssigned").value = task.assigned;
    document.getElementById("editDate").value = task.date;

    editPopup.style.display = "flex";
}

document.getElementById("cancelEditBtn").onclick = () => {
    editPopup.style.display = "none";
};

document.getElementById("saveEditBtn").onclick = () => {
    const task = tasks[editIndex];

    task.title = document.getElementById("editTitle").value;
    task.description = document.getElementById("editDescription").value;
    task.notes = document.getElementById("editNotes").value;
    task.category = document.getElementById("editCategory").value;
    task.priority = document.getElementById("editPriority").value;
    task.assigned = document.getElementById("editAssigned").value;
    task.date = document.getElementById("editDate").value;

    saveTasks();
    renderTasks();

    editPopup.style.display = "none";
};
