<?php
session_start();
include('config/db.php'); // Include your database connection file

header('Content-Type: application/json'); // Ensure the response is in JSON format

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['email'], $_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Query the database for the user with the provided email
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['pass'])) {
            // If the user is found and the password matches, create a session or return success
            $_SESSION['user_id'] = $user['id']; // Store user ID in session
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            // Invalid credentials
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        }
    } else {
        // Missing required fields
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    }
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
