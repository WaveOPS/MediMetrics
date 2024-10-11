<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

// Database connection parameters
$servername = "localhost"; // Your server name
$username_db = "root"; // Your MySQL username
$password_db = ""; // Your MySQL password
$dbname = "medimetrics_db"; // Your database name

// Create connection
$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode(['error' => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Initialize response array
$response = [];

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $fullName = $_POST['fullName'] ?? '';
    $age = $_POST['age'] ?? '';
    $area = $_POST['area'] ?? '';
    $specialization = $_POST['specialization'] ?? '';

    // Validate input data
    if (empty($fullName) || empty($age) || empty($area) || empty($specialization)) {
        $response['error'] = "All fields are required.";
    } else {
        // File upload handling
        if (isset($_FILES['photo'])) {
            $photo = $_FILES['photo'];
            $targetDir = "uploads/";

            // Ensure the uploads directory exists
            if (!is_dir($targetDir)) {
                mkdir($targetDir, 0755, true);
            }

            $targetFile = $targetDir . basename($photo["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

            // Check if file is an actual image
            $check = getimagesize($photo["tmp_name"]);
            if ($check === false) {
                $response['error'] = "File is not an image.";
                $uploadOk = 0;
            }

            // Check file size (5MB limit)
            if ($photo["size"] > 5000000) {
                $response['error'] = "Sorry, your file is too large.";
                $uploadOk = 0;
            }

            // Allow certain file formats
            if (!in_array($imageFileType, ['jpg', 'png', 'jpeg', 'gif'])) {
                $response['error'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }

            // Check if everything is ok to upload
            if ($uploadOk == 0) {
                if (!isset($response['error'])) {
                    $response['error'] = "Sorry, your file was not uploaded.";
                }
            } else {
                // Try to upload file
                if (move_uploaded_file($photo["tmp_name"], $targetFile)) {
                    // Prepare SQL statement
                    $stmt = $conn->prepare("INSERT INTO doctor (dr_name, dr_age, dr_area, dr_specialization, dr_photo) VALUES (?, ?, ?, ?, ?)");
                    if ($stmt === false) {
                        $response['error'] = "SQL Prepare Error: " . $conn->error;
                    } else {
                        $stmt->bind_param("sisss", $fullName, $age, $area, $specialization, $targetFile);

                        if ($stmt->execute()) {
                            $response['success'] = "Doctor added successfully: " . htmlspecialchars($fullName);
                        } else {
                            $response['error'] = "SQL Execute Error: " . $stmt->error;
                        }

                        $stmt->close();
                    }
                } else {
                    $response['error'] = "Sorry, there was an error uploading your file.";
                }
            }
        } else {
            $response['error'] = "No file uploaded.";
        }
    }
} else {
    $response['error'] = "Invalid request method.";
}

// Close connection
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
