document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');

    // Authentication function
    function authenticate(username, password) {
        // Basic authentication (replace with your actual auth logic)
        return username === 'william767' && password === 'Wscott1230';
    }

    // Login handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            if (authenticate(username, password)) {
                // Store authentication state
                sessionStorage.setItem('isAuthenticated', 'true');
                
                if (rememberMe) {
                    localStorage.setItem('rememberedUser', username);
                }

                // Transition to dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Logout handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear authentication state
            sessionStorage.removeItem('isAuthenticated');
            localStorage.removeItem('rememberedUser');
            
            // Redirect to login
            window.location.href = 'index.html';
        });
    }

    // Check authentication on page load
    function checkAuthentication() {
        const currentPath = window.location.pathname;
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

        if (currentPath.includes('dashboard.html') && !isAuthenticated) {
            // Redirect to login if not authenticated
            window.location.href = 'index.html';
        }

        // Optionally pre-fill username if remembered
        if (currentPath.includes('index.html')) {
            const rememberedUser = localStorage.getItem('rememberedUser');
            if (rememberedUser) {
                document.getElementById('username').value = rememberedUser;
                document.getElementById('rememberMe').checked = true;
            }
        }
    }

    // Run authentication check
    checkAuthentication();
});