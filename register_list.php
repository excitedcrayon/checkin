<?php 

    $DB_HOST = '127.0.0.1';
    $DB_USER = 'root';
    $DB_PASSWORD = '2023Dbroot';
    $DB_NAME = 'testingcheckin';

    $data = [];

    try {

        $conn = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASSWORD);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $dataSQL = " SELECT * FROM `registration` ORDER BY id ASC ";
        $dataStmt = $conn->prepare($dataSQL);
        $dataStmt->execute();
        
        $dataList = $dataStmt->fetchAll(PDO::FETCH_ASSOC);

        if ( !empty($dataList) ) {
            $data['list'] = $dataList;
        }

    } catch (PDOException $e) {
        //echo "Connection failed: " . $e->getMessage();
        $data['pdoException'] = $e->getMessage();
    }

    echo json_encode($data);

?>