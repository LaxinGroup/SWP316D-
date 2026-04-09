<?php
$conn = new mysqli("localhost", "root", "", "smartbus");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users (fullname, phone, email, password)
            VALUES ('$fullname', '$phone', '$email', '$hashed_password')";

    if ($conn->query($sql) === TRUE) {
        header("Location: LogInPage.php");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
}
?>