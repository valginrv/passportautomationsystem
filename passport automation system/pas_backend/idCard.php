<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Passport ID Card</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            background: black;
        }
        
        .container {
            background: white;
            width: 350px;
            height: 500px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            overflow: hidden;
            border-radius: 10px;
        }
        
        .bg {
            position: relative;
            top: 20px;
            left: -100px;
        }
        
        .circle1 {
            width: 550px;
            height: 550px;
            background-color: maroon;
            border-radius: 50%;
        }
        
        .circle2 {
            width: 550px;
            height: 550px;
            background-color: white;
            border-radius: 50%;
            position: relative;
            top: -300px;
            left: 25px;
        }
        
        .info {
            position: absolute;
            top: 40px;
            width: 100%;
        }
        
        .info img {
            border-radius: 50%;
            width: 170px;
            height: 170px;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .info h1 {
            text-align: center;
            color: white;
        }
        
        .info h3 {
            text-align: center;
        }
        
        .label {
            color: maroon;
        }
        
        .value {
            color: darkslategray;
        }
    </style>

</head>

<body>
    <div class="container" id="print">
        <div class="bg">
            <div class="circle1"></div>
            <div class="circle2"></div>
        </div>
        <div class="info">
            <?php
                require("include/Utility.php");
                require("include/DatabaseController.php");

                $dbController = new DatabaseController();
                $conn = $dbController->getConnection();
                $stmt = $conn->prepare("SELECT * FROM application WHERE passport_number=?;");
                $stmt->bind_param("s", $_GET['id']);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();                
            
                echo '<img src=./uploads/'.$row['passport_photo'].' alt="">';
                echo '<br/>';
                echo '<br/>';
                echo '<h1>Passport ID Card</h1>';
                echo '<br/>';
                echo '<br/>';
                echo '<h3 class="label">Name:</h3>';
                echo '<h3 class="value">'.$row['full_name'].'</h3>';
                echo '<br/>';
                echo '<h3 class="label">Passport Number:</h3>';
                echo '<h3 class="value">'.$_GET['id'].'</h3>';
                echo '<br/>';
                echo '<h3 class="label">Phone Number:</h3>';
                echo '<h3 class="value">'.$row['phone_number'].'</h3>';
            ?>
        </div>
    </div>
    <script>
        $('document').ready(function() {
            setTimeout(function() {
                window.print();
            }, 500);
        })
    </script>
</body>

</html>