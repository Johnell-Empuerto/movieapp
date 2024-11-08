<?php
session_start();
include('config/db.php'); // Include your database connection file

header('Content-Type: application/json'); // Set response as JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['movie_id'])) {
        $movie_id = $_POST['movie_id'];
        $user_id = $_SESSION['user_id']; // Assuming the user is logged in and their ID is stored in the session

        // Insert the movie into the favorites table
        $stmt = $pdo->prepare("INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)");
        $stmt->execute([$user_id, $movie_id]);

        // Respond with a success message
        echo json_encode(['success' => true, 'message' => 'Movie added to favorites.']);
    } else {
        // Respond with an error if the movie_id is not set
        echo json_encode(['success' => false, 'message' => 'Movie ID is missing.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
