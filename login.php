<?php 
    header("Access-Control-Allow-Origin: http://127.0.0.1:5500");

    $DB_HOST = '127.0.0.1';
    $DB_USER = 'root';
    $DB_PASSWORD = '2023Dbroot';
    $DB_NAME = 'testingcheckin';

    $data = [];

    try{
        $conn = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASSWORD);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ( $_SERVER['REQUEST_METHOD'] == "POST" ) {

            $qrcodeid = $_POST['qrcodeid'];

            $userSql = " SELECT * FROM registration WHERE qrcodeid LIKE ? LIMIT 1 ";
            $userStmt = $conn->prepare($userSql);
            $userStmt->execute([$qrcodeid]);
            $userData = $userStmt->fetch(PDO::FETCH_ASSOC);

            $data['userData'] = $userData;

        }

    }catch(PDOException $e) {
        $data['pdoException'] = $e->getMessage();
    }

    echo json_encode($data);
?>