<?php
session_start(); // Start a session to use session variables

// Define hard-coded credentials for demonstration
$valid_username = 'user';
$valid_password = 'password';

// Function to sanitize user input
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Check if the form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get and sanitize form input
    $username = sanitize_input($_POST['username']);
    $password = sanitize_input($_POST['password']);

    // Initialize response variables
    $response = [
        'success' => false,
        'message' => ''
    ];

    // Validate input
    if (empty($username) || empty($password)) {
        $response['message'] = 'Both fields are required.';
    } elseif ($username === $valid_username && $password === $valid_password) {
        // Simulate successful login
        $_SESSION['username'] = $username; // Store username in session
        $response['success'] = true;
        $response['message'] = 'Login successful!';
    } else {
        $response['message'] = 'Invalid username or password.';
    }

    // Output response in JSON format
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}
