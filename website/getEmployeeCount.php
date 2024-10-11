<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database credentials
$servername = "localhost";  // Adjust this if your DB is on a different host
$username = "root";         // Your DB username
$password = "";             // Your DB password
$dbname = "medimetrics_db";   // Your database name

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Query to get the count of employees
$sql = "SELECT COUNT(*) as count FROM employee";
$result = $conn->query($sql);

// Check if the query was successful
if ($result) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["error" => "Query failed: " . $conn->error]);
}

// Close the connection
$conn->close();
?>
