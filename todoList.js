const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
displayTask();
const completedTaskList = JSON.parse(localStorage.getItem('completed-tasks')) || [];
displayCompletedTasks()



function addNewTask() {
    const input = document.getElementById('newTask')
    const task = input.value.trim()

    if (task === '') return;

    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList))
    input.value = '';
    displayTask();
}

function displayTask() {
    const taskDisplayDiv = document.getElementById('taskListDisplay');
    taskDisplayDiv.innerHTML = '';

    taskList.forEach((t, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.textContent = `${index + 1}. ${t}`;// Task content
        taskText.className = 'task-text';

        // Complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Done';
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click', () => {
            completedTaskList.push(t)
            localStorage.setItem('completed-tasks', JSON.stringify(completedTaskList))
            removeTask(index);
            displayCompletedTasks()

        })

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => {
            const newTask = prompt('Edit task:', t);
            if (newTask !== null && newTask.trim() !== '') {
                taskList[index] = newTask.trim();
                localStorage.setItem('tasks', JSON.stringify(taskList))
                displayTask();
            }
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            removeTask(index);
        });

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(completeBtn);
        taskDiv.appendChild(editBtn);
        taskDiv.appendChild(deleteBtn);

        taskDisplayDiv.appendChild(taskDiv);
    });
}

function displayCompletedTasks() {
    const completedTaskListDiv = document.getElementById('completedTaskListDisplay');
    completedTaskListDiv.innerHTML = '';

    completedTaskList.forEach((t, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'completed-item';

        const taskText = document.createElement('span');
        taskText.textContent = `${t}`;
        taskText.className = 'task-text';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn'
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', () => {
            removeCompletedTask(index)
        })

        taskDiv.appendChild(taskText)
        taskDiv.appendChild(deleteBtn)

        completedTaskListDiv.appendChild(taskDiv)
    })
}


function removeTask(ind) {
    taskList.splice(ind,1);
    localStorage.setItem('tasks', JSON.stringify(taskList))
    displayTask();
}

function removeCompletedTask(ind) {
    completedTaskList.splice(ind, 1);
    localStorage.setItem('completed-tasks', JSON.stringify(completedTaskList));
    displayCompletedTasks()
}