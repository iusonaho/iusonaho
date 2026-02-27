const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    toggleBtn.setAttribute('aria-label', 'Change Theme');
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        toggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    });
});