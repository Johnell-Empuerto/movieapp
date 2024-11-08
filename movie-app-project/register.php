<?php
session_start();
include('config/db.php'); // Include your database connection file

header('Content-Type: application/json'); // Set the correct content type for JSON responses

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Check if the necessary POST data is available
    if (isset($_POST['username'], $_POST['email'], $_POST['password'])) {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Hash the password for security
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // Check if email already exists
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $existingUser = $stmt->fetch();

        if ($existingUser) {
            // Send back a JSON response indicating failure
            echo json_encode(['success' => false, 'message' => 'Email already in use']);
            exit();
        }

        // Insert new user into the database
        $stmt = $pdo->prepare("INSERT INTO users (username, email, pass) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);

        // Send back a JSON response indicating success
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        // If required fields are missing, return an error message
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    }
} else {
    // Handle if request method is not POST
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
