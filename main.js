function toggleSidebar() {
    const sidebar = document.getElementById('sidebarRight');
    const button = document.querySelector('.toggle-button');
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        button.innerHTML = '&#9664;'; // Left arrow
    } else {
        sidebar.classList.add('collapsed');
        button.innerHTML = '&#9654;'; // Right arrow
    }
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    document.getElementById('darkModeSwitch').checked = isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkMode() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeSwitch').checked = true;
    }
}

document.addEventListener('DOMContentLoaded', loadDarkMode);