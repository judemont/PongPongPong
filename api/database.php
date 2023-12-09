<?php



class Database {

    private $conn;
    public function __construct() {
        include_once(dirname(__FILE__) . "/../config.php");
        $this->conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
    public function select($sql_prompt) {
        $result = mysqli_query($this->conn, $sql_prompt);

        if (!$result) {
            die("Query failed: " . mysqli_error($this->conn));
        }

        $data = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }

        return $data;
    }

    public function query($sql_prompt) {
        $result = $this->conn->query($sql_prompt);

        if (!$result) {
            die("Query failed: " . mysqli_error($this->conn));
        }

        return $result;
    }

    public function closeConnection() {
        mysqli_close($this->conn);
    }

    public function escapeStrings($str) {
        return mysqli_real_escape_string($this->conn, $str);
    }
}

?>