<?php
    // error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    include_once("database.php");

    $score = $_POST["score"];
    $username = $_POST["username"];

    $db = new Database();

    $db -> query("INSERT INTO ju_pong_scores (username, score) VALUES ('$username', '$score')")
?>