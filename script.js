const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

// Load todos from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadTodos);

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    createTodoItem(todoText);
    saveToLocalStorage(todoText, false);
    
    todoInput.value = '';
}

function createTodoItem(text, completed = false) {
    const li = document.createElement('li');
    if (completed) li.classList.add('completed');

    li.innerHTML = `
        <span>${text}</span>
        <button>Delete</button>
    `;

    // Toggle completed
    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    // Delete
    li.querySelector('button').addEventListener('click', () => {
        li.remove();
        updateLocalStorage();
    });

    todoList.appendChild(li);
}

// LocalStorage functions
function saveToLocalStorage(todoText, completed) {
    let todos = getTodosFromStorage();
    todos.push({ text: todoText, completed });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodosFromStorage() {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
}

function loadTodos() {
    const todos = getTodosFromStorage();
    todos.forEach(todo => createTodoItem(todo.text, todo.completed));
}

function updateLocalStorage() {
    const todos = [];
    document.querySelectorAll('#todoList li').forEach(li => {
        const text = li.querySelector('span').textContent;
        const completed = li.classList.contains('completed');
        todos.push({ text, completed });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}