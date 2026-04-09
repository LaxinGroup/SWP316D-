<?php
    session_start();
    if (!isset($_SESSION["user_id"])){
        header("Location: LoginPage.php");
        exit();
    }
?>


<!DOCTYPE <html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale-1.0">
            <title>SmartBus Dashboard</title>
            <link rel="stylesheet" href="Dashboard.css">
            <link href="https://googleapis.com" rel="stylesheet">
        </head>
        <body>
            <div class="header">
                <div class="profile-container">
                    <span class="material-icons account-icon">person</span>
                    <div class="user-details">
                        <h3><?php echo $_SESSION['fullname']; ?></h3>
                        <p><?php echo $_SESSION['email']; ?></p>
                        <p><?php echo $_SESSION['phone']; ?></p>
                    </div>
                <a href="logout.php" class="logout">Logout</a>
                </div>
            </div>

            <div class="search-area">
                <div class="where-to">
                    <div class="dot"></div>
                    <div class="input-placeholder">Where to?</div>
                    <span class="material-icons" style="color: #ccc;">search</span>
                </div>
            </div>

            <div id="map"></div>

            <script async
                src="https://googleapis.com" ?key="AIzaSyCTPFxxl4PWbu7FDAC-P--qk-9dTUrZN10">
            </script>

            <script>
                function initMap() {
                    const soshanguve = { lat: -25.5413, lng: 28.0967 };
                    const map = new google.maps.Map(document.getElementById("map"), {
                        zoom: 14,
                        center: soshanguve,
                        disableDefaultUI: true, // Clean Bolt-style look
                    });

                // Add a simple green marker for user position
                    new google.maps.Marker({
                        position: soshanguve,
                        map: map,
                        title: "Your Location"
                    });
                }
            </script>

        </body>
</html>

