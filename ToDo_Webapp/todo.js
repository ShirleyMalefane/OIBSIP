document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    function addTask(taskText) {
        const task = document.createElement('li');
        const timestamp = new Date().toLocaleString();
        task.innerHTML = `
            ${taskText}
            <span class="timestamp">[Added: ${timestamp}]</span>
        `;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete-btn';
        completeButton.addEventListener('click', () => {
            completeTask(task);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', () => {
            deleteTask(task);
        });

        task.appendChild(completeButton);
        task.appendChild(deleteButton);
        pendingTasksList.appendChild(task);
    }

    function completeTask(task) {
        task.classList.add('complete');
        const completionTimestamp = new Date().toLocaleString();
        task.querySelector('.timestamp').textContent += ` [Completed: ${completionTimestamp}]`;
        completedTasksList.appendChild(task);
        task.querySelector('.complete-btn').remove();
    }

    function deleteTask(task) {
        task.remove();
    }
});
