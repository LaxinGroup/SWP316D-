<?php
// 1. Better to keep credentials in a separate config file or environment variables
$conn = new mysqli("localhost", "root", "student", "smartbus");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // 2. Use placeholders (?) instead of variables in the SQL string
    $stmt = $conn->prepare("INSERT INTO users (fullname, phone, email, password) VALUES (?, ?, ?, ?)");
    
    // 3. Bind the actual data to the placeholders ("ssss" means 4 strings)
    $stmt->bind_param("ssss", $fullname, $phone, $email, $hashed_password);

    // 4. Execute the statement
    if ($stmt->execute()) {
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
?>
