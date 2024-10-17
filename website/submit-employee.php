<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

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

$response = [];

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $age = $_POST['age'] ?? '';
    $area = $_POST['area'] ?? '';
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? ''; // Consider hashing the password

    // File upload handling
    if (isset($_FILES['photo'])) {
        $photo = $_FILES['photo'];
        $targetDir = "uploads/"; // Directory to save uploaded files

        // Ensure the uploads directory exists
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0755, true);
        }

        $targetFile = $targetDir . basename($photo["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        // Validate file is an actual image
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

        // Allow only JPG, JPEG, PNG, and GIF file formats
        if (!in_array($imageFileType, ['jpg', 'png', 'jpeg', 'gif'])) {
            $response['error'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        if ($uploadOk === 0) {
            if (!isset($response['error'])) {
                $response['error'] = "Sorry, your file was not uploaded.";
            }
        } else {
            // Upload file
            if (move_uploaded_file($photo["tmp_name"], $targetFile)) {
                // Store relative file path in the database, e.g., 'uploads/employee_photo.jpg'
                $relativePath = basename($photo["name"]);

                // Prepare SQL statement
                $stmt = $conn->prepare("INSERT INTO employee (name, age, area, username, password, photo) VALUES (?, ?, ?, ?, ?, ?)");
                if ($stmt === false) {
                    $response['error'] = "Prepare failed: " . $conn->error;
                } else {
                    $stmt->bind_param("sissss", $name, $age, $area, $username, $password, $relativePath);

                    if ($stmt->execute()) {
                        $response['success'] = "Employee data submitted successfully.";
                        $response['photo'] = $relativePath; // Return the uploaded photo path
                    } else {
                        $response['error'] = "Execute failed: " . $stmt->error;
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
} else {
    $response['error'] = "Invalid request method.";
}

// Close connection
$conn->close();

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
