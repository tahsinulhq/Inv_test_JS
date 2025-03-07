document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            todoList.innerHTML = '<p class="empty-list">Your todo list is empty. Add a new task!</p>';
            return;
        }
        
        todos.forEach((todo, index) => {
            const todoItem = document.createElement('li');
            todoItem.classList.add('todo-item');
            
            const todoText = document.createElement('span');
            todoText.classList.add('todo-text');
            if (todo.completed) {
                todoText.classList.add('completed');
            }
            todoText.textContent = todo.text;
            
            // Add click event to toggle completed state
            todoText.addEventListener('click', () => {
                toggleCompleted(index);
            });
            
            const todoActions = document.createElement('div');
            todoActions.classList.add('todo-actions');
            
            const editButton = document.createElement('button');
            editButton.classList.add('edit-btn');
            editButton.innerHTML = '<i class="fas fa-edit"></i>';
            editButton.addEventListener('click', () => {
                editTodo(todoItem, index);
            });
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.addEventListener('click', () => {
                deleteTodo(index);
            });
            
            todoActions.appendChild(editButton);
            todoActions.appendChild(deleteButton);
            
            todoItem.appendChild(todoText);
            todoItem.appendChild(todoActions);
            
            todoList.appendChild(todoItem);
        });
    }
    
    // Add new todo
    function addTodo() {
        const todoText = todoInput.value.trim();
        
        if (todoText === '') return;
        
        todos.push({
            text: todoText,
            completed: false
        });
        
        saveTodos();
        todoInput.value = '';
        renderTodos();
    }
    
    // Edit todo
    function editTodo(todoItem, index) {
        todoItem.classList.add('editing');
        
        const todoText = todoItem.querySelector('.todo-text');
        const todoActions = todoItem.querySelector('.todo-actions');
        
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.classList.add('edit-input');
        editInput.value = todos[index].text;
        
        const saveButton = document.createElement('button');
        saveButton.classList.add('edit-btn');
        saveButton.innerHTML = '<i class="fas fa-check"></i>';
        
        const cancelButton = document.createElement('button');
        cancelButton.classList.add('delete-btn');
        cancelButton.innerHTML = '<i class="fas fa-times"></i>';
        
        // Hide existing elements
        todoText.style.display = 'none';
        todoActions.style.display = 'none';
        
        // Add new elements
        todoItem.insertBefore(editInput, todoText);
        
        const editActions = document.createElement('div');
        editActions.classList.add('todo-actions');
        editActions.appendChild(saveButton);
        editActions.appendChild(cancelButton);
        todoItem.appendChild(editActions);
        
        // Focus the input
        editInput.focus();
        
        // Save edited todo
        saveButton.addEventListener('click', () => {
            const newText = editInput.value.trim();
            if (newText !== '') {
                todos[index].text = newText;
                saveTodos();
            }
            finishEditing();
        });
        
        // Cancel editing
        cancelButton.addEventListener('click', finishEditing);
        
        // Handle Enter key
        editInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const newText = editInput.value.trim();
                if (newText !== '') {
                    todos[index].text = newText;
                    saveTodos();
                }
                finishEditing();
            }
        });
        
        function finishEditing() {
            todoItem.classList.remove('editing');
            todoItem.removeChild(editInput);
            todoItem.removeChild(editActions);
            todoText.style.display = '';
            todoActions.style.display = '';
            renderTodos();
        }
    }
    
    // Delete todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }
    
    // Toggle completed state
    function toggleCompleted(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Event listeners
    addButton.addEventListener('click', addTodo);
    
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Initial render
    renderTodos();
});