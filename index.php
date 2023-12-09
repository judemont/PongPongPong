<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JdM's PONG</title>

    <script defer src="game.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class='leader_bord'>
        <h2>Global Leader Bord :</h2>
        <?php
            // error_reporting(E_ALL);
            // ini_set('display_errors', 1);
            include_once("api/database.php");

            $db = new Database;
            $leaderBord = $db -> select("SELECT * from ju_pong_scores ORDER BY score DESC");

            $i = 1;
            foreach($leaderBord as $result){
                $username = $result["username"];
                $score = $result["score"];
                echo "<p>#<b>$i</b> $username : $score</p>";
                $i ++;
            }
        ?>
    </div>

    <input type="text" required maxlength="99" placeholder="Username" id="usernameInput" class="username_input">
    <button type="submit" onclick="start()" class="play_again_button" id="playAgainButton">PLAY</button>

    <canvas class="game-canvas" id="gameCanvas"></canvas> 
</body>
</html>