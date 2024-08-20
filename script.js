document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const loadingMessage = document.getElementById('loading-message');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form from submitting normally

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // Clear previous messages
        errorMessage.textContent = '';
        successMessage.textContent = '';
        loadingMessage.style.display = 'none';

        // Basic validation
        if (username === '' || password === '') {
            errorMessage.textContent = 'Both fields are required.';
            return;
        }

        // Show loading message
        loadingMessage.style.display = 'block';
        submitBtn.disabled = true;

        try {
            // Submit form data to the PHP script
            const response = await fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: username,
                    password: password
                })
            });

            const result = await response.json();

            if (result.success) {
                successMessage.textContent = result.message;
                form.reset(); // Clear the form fields
            } else {
                errorMessage.textContent = result.message;
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
        } finally {
            loadingMessage.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
});
