// Task array to store all tasks
let tasks = [];

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    renderTasks();
    setupEventListeners();
});

// Setup event listeners for input and button
function setupEventListeners() {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');

    // Add task when button is clicked
    addBtn.addEventListener('click', addTask);

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}

// Add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const description = taskInput.value.trim();

    if (description === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new task object
    const newTask = {
        id: Date.now(), // Use timestamp as unique ID
        description: description,
        completed: false
    };

    // Add task to the array
    tasks.push(newTask);

    // Save to localStorage
    saveTasks();

    // Clear input
    taskInput.value = '';
    taskInput.focus();

    // Re-render tasks
    renderTasks();
}

// Toggle task completion status
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

// Sort tasks: pending tasks first, completed tasks at the end
function getSortedTasks() {
    const pending = tasks.filter(t => !t.completed);
    const completed = tasks.filter(t => t.completed);
    return [...pending, ...completed];
}

// Render all tasks from the tasks array
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    const sortedTasks = getSortedTasks();

    if (sortedTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p>No tasks yet. Add one to get started!</p>
            </div>
        `;
        return;
    }

    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="task-checkbox" 
                ${task.completed ? 'checked' : ''}
                aria-label="Mark task as ${task.completed ? 'incomplete' : 'complete'}"
            >
            <span class="task-description">${escapeHtml(task.description)}</span>
            <button class="delete-btn" aria-label="Delete task">Delete</button>
        `;

        // Add event listener to checkbox
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTask(task.id));

        // Add event listener to delete button
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        tasksList.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        try {
            tasks = JSON.parse(savedTasks);
        } catch (e) {
            console.error('Error loading tasks:', e);
            tasks = [];
        }
    }
}

// Escape HTML special characters to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
