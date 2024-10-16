<?php
$host = "localhost";
$db_name = "medimetrics_db";
$username = "root";
$password = "";

// Connect to the database
$conn = new mysqli($host, $username, $password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch doctor details
$query = "SELECT dr_name, dr_specialization, dr_area FROM doctor";
$result = $conn->query($query);

$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

// Return the data as JSON
echo json_encode($doctors);
$conn->close();
?>
