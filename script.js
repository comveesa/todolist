const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const countEl = document.getElementById('count');
const clearBtn = document.getElementById('clear-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCount() {
    const count = todos.filter(t => !t.completed).length;
    countEl.textContent = `${count} รายการ`;
}

function createTodoElement(todo, index) {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    li.innerHTML = `
        <div class="checkbox" data-index="${index}"></div>
        <span class="text">${todo.text}</span>
        <button class="delete-btn" data-index="${index}">×</button>
    `;

    li.querySelector('.checkbox').addEventListener('click', () => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        render();
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        render();
    });

    return li;
}

function render() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        todoList.appendChild(createTodoElement(todo, index));
    });
    updateCount();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        saveTodos();
        render();
        todoInput.value = '';
    }
}

addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

clearBtn.addEventListener('click', () => {
    todos = [];
    saveTodos();
    render();
});

render();
