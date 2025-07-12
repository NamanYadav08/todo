const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function saveTodosLocal(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodosLocal() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function saveTodos() {
  const todos = [];
  list.querySelectorAll('li').forEach(li => {
    todos.push({
      text: li.querySelector('.todo-text').textContent,
      completed: li.classList.contains('completed')
    });
  });
  saveTodosLocal(todos);
}

function loadTodos() {
  const todos = loadTodosLocal();
  todos.forEach(todo => addTodoItem(todo.text, todo.completed));
}

function addTodoItem(text, completed = false) {
  const li = document.createElement('li');
  li.className = completed ? 'completed' : '';
  li.innerHTML = 
    '<span class="todo-text">' + text + '</span>' +
    '<button class="remove-btn" title="Remove task">&times;</button>';

  li.querySelector('.todo-text').addEventListener('click', () => {
    if (!li.classList.contains('completed')) {
      li.classList.add('completed');
      saveTodos();
    }
  });

  li.querySelector('.remove-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTodos();
  });

  list.appendChild(li);
  saveTodos();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTodoItem(text);
    input.value = '';
    input.focus();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  loadTodos();
});

