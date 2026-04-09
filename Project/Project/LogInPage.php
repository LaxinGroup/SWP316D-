<?php
ob_start();
session_start();
$conn = new mysqli("localhost", "root", "student", "smartbus");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$error = "";

if (isset($_POST['login'])) {
    $phone = $_POST['numbers'];
    $password = $_POST['password'];

    // DEBUG: Uncomment the line below to see if the form is actually submitting
    //die("Form submitted with: " . $phone);

    $sql = "SELECT * FROM users WHERE phone='$phone'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['fullname'] = $user['fullname'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['phone'] = $user['phone'];


            header("Location: dashboard.php");
            exit();
        } 
    }
}
?>