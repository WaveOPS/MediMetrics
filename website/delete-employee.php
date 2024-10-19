<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$servername = "localhost";
$username = "root";  // Replace with your database username
$password = "";  // Ensure there's no space here; if your password is empty, keep it as an empty string
$dbname = "medimetrics_db"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse the incoming request to get the ID
    parse_str(file_get_contents("php://input"), $data);
    $id = isset($data['id']) ? intval($data['id']) : 0;

    if ($id > 0) {
        // Prepare and bind
        $stmt = $conn->prepare("DELETE FROM employee WHERE id = ?");
        $stmt->bind_param("i", $id);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Employee deleted successfully.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error deleting employee: ' . $stmt->error]);
        }

        // Close statement
        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid ID.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}

// Close connection
$conn->close();
?>
