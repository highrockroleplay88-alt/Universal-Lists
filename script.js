let tasks = [];

// 1. Initialize Particles.js
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80 },
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3 },
        "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2 }
    },
    "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" } }
    }
});

// 2. Load tasks from URL on startup
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('tasks');
    if (sharedData) {
        try {
            tasks = JSON.parse(atob(sharedData));
            renderTasks();
        } catch (e) {
            console.error("Invalid share link");
        }
    }
};

function addTask() {
    const input = document.getElementById('taskInput');
    if (input.value.trim()) {
        tasks.push(input.value.trim());
        input.value = '';
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = tasks.map((task, index) => `
        <li class="list-group-item">
            ${task}
            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">×</button>
        </li>
    `).join('');
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// 3. Generate Shareable Link (Base64)
function generateShareLink() {
    const base64Tasks = btoa(JSON.stringify(tasks));
    const shareUrl = `${window.location.origin}${window.location.pathname}?tasks=${base64Tasks}`;

    navigator.clipboard.writeText(shareUrl);
    Swal.fire({
        title: 'Link Copied!',
        text: 'Anyone with this link can see your current list.',
        icon: 'success',
        confirmButtonColor: '#0d6efd'
    });
}
