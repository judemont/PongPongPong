<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    include_once("database.php");

    $db = new Database();

    $score = $db -> escapeStrings($_POST["score"]);
    $username =  $db -> escapeStrings(strtolower($_POST["username"]));



    $pastScores = $db -> select("SELECT * FROM ju_pong_scores WHERE username = '$username'")[0];

    if (count($pastScores) >= 1) {
        if($score > $pastScores["score"]){
            $db -> query("UPDATE ju_pong_scores SET score = '$score' WHERE username = '$username'");
        }
    }else {
        $db -> query("INSERT INTO ju_pong_scores (username, score) VALUES ('$username', '$score')");
    }


?>