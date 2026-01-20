document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode'); // Remove default
        body.classList.add(savedTheme);
        // Update button icon based on the loaded theme
        updateThemeToggleIcon(savedTheme === 'dark-mode');
    } else {
        // If no saved theme, default to light mode and update icon
        body.classList.add('light-mode');
        updateThemeToggleIcon(false); // Default to sun icon (meaning it will switch to dark)
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode'); // Save preference
            updateThemeToggleIcon(true);
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode'); // Save preference
            updateThemeToggleIcon(false);
        }
    });

    // Function to update the icon (moon for dark, sun for light)
    function updateThemeToggleIcon(isDarkMode) {
        const icon = themeToggle.querySelector('i');
        if (isDarkMode) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            icon.title = "Switch to Light Mode";
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            icon.title = "Switch to Dark Mode";
        }
    }
});