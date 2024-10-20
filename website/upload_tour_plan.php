<?php
// Database connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "your_database"; // Replace with your database name

$conn = new mysqli($host, $user, $password, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the POST data
$employee_id = $_POST['employee_id'];
$doctor_list = $_POST['doctor_list'];  // JSON string of doctor names

if ($employee_id && $doctor_list) {
    // Prepare SQL query
    $stmt = $conn->prepare("INSERT INTO tour_plans (employee_id, doctor_list) VALUES (?, ?)");
    $stmt->bind_param("is", $employee_id, $doctor_list);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Tour plan submitted successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to submit tour plan."]);
    }
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Invalid data provided."]);
}

$conn->close();
?>
