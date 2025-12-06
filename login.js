document.addEventListener('DOMContentLoaded', () => {
    // Select the form element
    const loginForm = document.querySelector('form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            // 1. Stop the browser from trying to submit to a server
            e.preventDefault();

            // 2. Get the values the user typed
            const emailValue = document.getElementById('email').value;
            const passwordValue = document.getElementById('password').value;

            // 3. Define the correct credentials
            const correctEmail = "rusheelchandranirmala569@gmail.com";
            const correctPass = "rusheel1234";

            // 4. Check if they match
            if (emailValue === correctEmail && passwordValue === correctPass) {
                alert("Login Successful! Welcome back, Rusheel.");
                // Redirect to the home page (or shop page)
                window.location.href = "index.html";
            } else {
                alert("Access Denied: Invalid Email or Password.");
            }
        });
    }
});