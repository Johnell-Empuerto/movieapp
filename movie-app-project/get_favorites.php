<?php
// Include database connection
include('config/db.php');

// Start session to get the logged-in user ID
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id']; // Get the logged-in user ID

try {
    // Query to get the movies in the user's favorites
    $stmt = $pdo->prepare("SELECT * FROM favorites WHERE user_id = :user_id");
    $stmt->execute(['user_id' => $user_id]);

    $favorites = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($favorites) {
        echo json_encode(['success' => true, 'favorites' => $favorites]);
    } else {
        echo json_encode(['success' => true, 'favorites' => [], 'message' => 'No favorites found.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>
