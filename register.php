<?php 

    $DB_HOST = '127.0.0.1';
    $DB_USER = 'root';
    $DB_PASSWORD = '2023Dbroot';
    $DB_NAME = 'testingcheckin';

    $FILE_FOLDER = 'res/codes';
    $data = [];

    try {
        $conn = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME", $DB_USER, $DB_PASSWORD);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if ( $_SERVER['REQUEST_METHOD'] == "POST" && !empty($_FILES) ) {

            // extract $_POST values
            $firstname = $_POST['firstname'];
            $middlename = $_POST['middlename'];
            $lastname = $_POST['lastname'];
            $gender = $_POST['gender'];
            $fellowshipgroup = $_POST['fellowshipgroup'];
            $category = $_POST['category'];
            $department = $_POST['department'];
            $region = $_POST['region'];
            $email = $_POST['email'];
            $phone = $_POST['phone'];
            $passportnumber = $_POST['passportnumber'];
            $placeofstay = $_POST['placeofstay'];
            $qrcodeid = $_POST['qrcodeid'];


            $file = $_FILES['file']['name'];
            $tempfile = $_FILES['file']['tmp_name'];
            $filePath = $FILE_FOLDER . '/' . $file;

            // check if user is already registered
            $existsSql = " SELECT * FROM `registration` WHERE email = ? LIMIT 1 ";
            $existsStmt = $conn->prepare($existsSql);
            $existsStmt->execute([$email]);
            $userData = $existsStmt->fetch();

            if ( !empty($userData) ) {

                $data['userData'] = $userData;
                $data['userExists'] = true;
                $data['userExistsMessage'] = "You have already been registered";

            } else {

                if ( move_uploaded_file($tempfile, $filePath) ) {
                    $data['message'] = "File $file has been uploadeded";
    
                    // enter information into database
                    $sql = " INSERT into `registration`(firstname, middlename, lastname, gender, fellowshipgroup, category, department, region, email, phone, passportnumber, placeofstay, qrcodeid, qrcodename, qrcode, dateregistered, status) VALUES (:firstname, :middlename, :lastname, :gender, :fellowshipgroup, :category, :department, :region, :email, :phone, :passportnumber, :placeofstay, :qrcodeid, :qrcodename, :qrcode, CURRENT_TIMESTAMP, 'active') ";
                    $stmt = $conn->prepare($sql);
                    $stmt->bindParam(':firstname', $firstname);
                    $stmt->bindParam(':middlename', $middlename);
                    $stmt->bindParam(':lastname', $lastname);
                    $stmt->bindParam(':gender', $gender);
                    $stmt->bindParam(':fellowshipgroup', $fellowshipgroup);
                    $stmt->bindParam(':category', $category);
                    $stmt->bindParam(':department', $department);
                    $stmt->bindParam(':region', $region);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':phone', $phone);
                    $stmt->bindParam(':passportnumber', $passportnumber);
                    $stmt->bindParam(':placeofstay', $placeofstay);
                    $stmt->bindParam(':qrcodeid', $qrcodeid);
                    $stmt->bindParam(':qrcodename', $file);
                    $stmt->bindParam(':qrcode', $filePath);
    
                    $stmt->execute();

                    $data['userCreated'] = true;
                    $data['userCreatedMessage'] = "You have been registered. Thank you.";
    
                    // send email here if you have a template
    
                } else {
                    $data['message'] = "Error uploading file";
                }

            }

        }

        $data['connection'] = true;
        $data['connectionMessage'] = "Connected successfully";

      } catch(PDOException $e) {

        echo "Connection failed: " . $e->getMessage();
        $data['pdoException'] = $e->getMessage();

      }

    echo json_encode($data);

?>