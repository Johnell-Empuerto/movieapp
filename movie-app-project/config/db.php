<?php

$dbusername = "root";
$dbpass = "";

try{
    $pdo = new PDO("mysql:host=localhost; dbname=movieapp", $dbusername, $dbpass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

}catch(PDOException $e){
    die("Connection Failed" . $e->getMessage());
}

?>