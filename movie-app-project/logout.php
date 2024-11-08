<?php
session_start();

// Destroy all session data
session_unset();
session_destroy();

// Redirect to login page (change 'login.html' to your actual login page if different)
header("Location: index.html");
exit();
?>
