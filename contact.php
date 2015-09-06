<?php
    $user = 'root';
    $password = 'root';
    $db = 'inventory';
    $host = 'localhost';
    $port = 3306;

    echo "variables created";

    $link = mysqli_init();
    $conn = mysqli_real_connect(
        $link,
        $host,
        $user,
        $password,
        $db,
        $port);

    echo "connection established";

    $sqldb = "CREATE DATABASE Inventory";
    if ($conn->query($sqldb) === TRUE) {
        echo "Database created successfully";
    } else {
        echo "Error creating database: " . $conn->error;
    }

    // sql to create table
    $sql = "CREATE TABLE MyGuests (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        reg_date TIMESTAMP)";

    if ($conn->query($sql) === TRUE) {
        echo "Table MyGuests created successfully";
    } else {
        echo "Error creating table: " . $conn->error;
    }

    $conn->close();

    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $from = "From: $email";
    $to = 'oberstein.j@husky.neu.edu';
    $subject = "New PF Message from: $name";
    $human = $_POST['human'];
    $isHuman = (trim($human) == '7') || (strtolower(trim($human)) == 'seven');

    $body = "Sender: $name\n\n$message";

    // Sends a message from a user and redirects them to a success page or
    // a failure page if the spam filter question was answered incorrectly.
    function sendMessage() {
        global $isHuman, $to, $subject, $body, $from;

        if ($isHuman) {
            if (mail($to, $subject, $body, $from)) {
                header("Location: contact-success.html");
                exit;
            }
        }
        header("Location: contact-failure.html");
        exit;
    }

    // If all required fields are filled, sends a user's message.
    // Otherwise, the message couldn't be sent and an error occurred.
    if ($_POST['submit']) {
        if ($name != '' && $email != '') {
            sendMessage();
        }
    }
    header("Location: contact-failure.html");
    exit;

