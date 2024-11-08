$(document).ready(function() {
    $('#register-form').submit(function(event) {
        event.preventDefault();

        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();

        // Simple password validation
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        $.ajax({
            url: 'register.php',
            type: 'POST',
            data: { username, email, password },
            success: function(response) {
                console.log(response); // Log the response to see what you're getting
                if (response.success) {
                    window.location.href = 'index.html'; // Redirect to login after successful registration
                } else {
                    alert(response.message); // Show the error message
                }
            },
            error: function(xhr, status, error) {
                console.log('AJAX error: ' + error); // Log any AJAX error
                alert("An error occurred. Please try again.");
            }
        });
    });
});
