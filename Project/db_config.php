<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "your_database_name";

// 1. Connect to MySQL (without a database selected yet)
$conn = new mysqli($host, $user, $pass);

// 2. Check if the database exists
$db_check = $conn->query("SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'");

if ($db_check->num_rows == 0) {
    // 3. Create the database if it doesn't exist
    $conn->query("CREATE DATABASE $dbname");
    $conn->select_db($dbname);

    // 4. Read and execute the .sql file
    $sqlFile = 'your_file.sql'; // Path to your exported file
    $sqlContent = file_get_contents($sqlFile);
    
    // Execute the full file (use multi_query for many commands)
    if ($conn->multi_query($sqlContent)) {
        echo "Database and tables created successfully!";
    }
}
?>
