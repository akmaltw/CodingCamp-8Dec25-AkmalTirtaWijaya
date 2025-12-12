let tasks = [];
const tasksInput = document.getElementById('tasksInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const tableBody = document.getElementById('tableBody');
const filterBtn = document.getElementById('filterBtn');

addBtn.addEventListener('click', () => {
    const task = tasksInput.value.trim();
    const date = dateInput.value;

    if (task ==='' || date === '') {
        alert('Please in all fields');
        return;
    }
    tasks.push({
        id: Date.now(),
        task,
        date,
        done: false
    });
    renderTasks(tasks);
    tasksInput.value = '';
    dateInput.value = '';
});
function renderTasks(data) {
    tableBody.innerHTML = '';
    if(data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No tasks available</td></tr>';
        return;

    }   
    data.forEach((t) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${t.task}</td>
            <td>${t.date}</td>
            <td>
            <span class="status ${t.done ? 'done' : 'not-done'}">
                ${t.done ? 'Done' : 'Not Done'}
            </span>
            </td>
            <td>
            <button class="action-btn" onclick="deleteTask(${t.id})">Delete</button>
            <button class="action-btn" onclick="toggleTaskStatus(${t.id})" style="background:#2ecc71">Update</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks(tasks);
}
function toggleTaskStatus(id) {
    tasks = tasks.map(t => 
    t.id === id ? {...t, done: !t.done} : t
    );
    renderTasks(tasks);
}   
filterBtn.addEventListener('click', () => {
    const filtered = tasks.filter((t) => !t.done);
    renderTasks(filtered);
});
clearBtn.addEventListener('click', () => {
    tasks = [];     
    renderTasks(tasks);
});
renderTasks(tasks);