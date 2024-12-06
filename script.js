document.getElementById('add-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('todo-input');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    addTask(taskText);
    taskInput.value = '';
    saveTasks();
});

function addTask(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function() {
        editTask(li, taskText);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    document.getElementById('todo-list').appendChild(li);
}

function editTask(li, oldText) {
    const taskInput = document.getElementById('todo-input');
    taskInput.value = oldText;

    const addBtn = document.getElementById('add-btn');
    addBtn.textContent = 'Save';
    addBtn.removeEventListener('click', addTaskHandler);
    addBtn.addEventListener('click', function saveHandler() {
        li.textContent = taskInput.value;
        li.classList.remove('editing');
        taskInput.value = '';
        addBtn.textContent = 'Add';
        addBtn.removeEventListener('click', saveHandler);
        addBtn.addEventListener('click', addTaskHandler);
        saveTasks();

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', function() {
            editTask(li, li.textContent);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            li.remove();
            saveTasks();
        });

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
    });

    li.classList.add('editing');
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(li => {
        tasks.push(li.textContent.replace('EditDelete', '').trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTask(taskText));
}

document.addEventListener('DOMContentLoaded', loadTasks);

const addTaskHandler = document.getElementById('add-btn').click;
