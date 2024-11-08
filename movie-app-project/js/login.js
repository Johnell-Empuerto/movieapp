$(document).ready(function() {
    $('#login-form').submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        const email = $('#email').val();
        const password = $('#password').val();

        // Simple validation
        if (!email || !password) {
            alert("Please fill out both fields.");
            return;
        }

        $.ajax({
            url: 'login.php',  // URL for the PHP login handler
            type: 'POST',
            data: { email: email, password: password },
            success: function(response) {
                console.log(response);  // Log the response to see what you're getting
                if (response.success) {
                    window.location.href = 'dashboard.html';  // Redirect on successful login
                } else {
                    alert(response.message);  // Show error message
                }
            },
            error: function(xhr, status, error) {
                console.log('AJAX error: ' + error);  // Log any AJAX errors
                alert("An error occurred. Please try again.");
            }
        });
    });
});
