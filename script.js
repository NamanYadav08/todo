const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function saveTodos() {}

function loadTodos() {}

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

