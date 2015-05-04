<?php
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