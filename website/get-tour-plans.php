<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enable CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "medimetrics_db";

$conn = new mysqli($host, $user, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Prepare SQL query to fetch all tour plans
$stmt = $conn->prepare("SELECT employee_id, id, doctor_list FROM tour_plans");
$stmt->execute();

$result = $stmt->get_result();
$tourPlans = [];

while ($row = $result->fetch_assoc()) {
    $tourPlans[] = $row; // Add each row to the tourPlans array
}

// Debugging: Log number of rows found
error_log("Found " . count($tourPlans) . " tour plans");

echo json_encode($tourPlans); // Return the tour plans as JSON

$stmt->close();
$conn->close();
?>
