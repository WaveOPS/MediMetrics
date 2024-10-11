<?php
// Allow cross-origin requests and set content type to JSON
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Database connection details
$servername = "localhost";
$username = "root"; // Replace with your MySQL username
$password = ""; // Replace with your MySQL password
$dbname = "medimetrics_db"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(array("error" => "Connection failed: " . $conn->connect_error)));
}

// SQL query to fetch employees
$sql = "SELECT * FROM employee";
$result = $conn->query($sql);

$employees = array();

if ($result->num_rows > 0) {
    // Fetch each employee's data and store it in the array
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
    // Return the employee data as JSON
    echo json_encode($employees);
} else {
    // Return a message if no employees are found
    echo json_encode(array("message" => "No records found"));
}

// Close the database connection
$conn->close();
?>
