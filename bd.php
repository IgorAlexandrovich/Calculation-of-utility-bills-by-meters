<?php
$config = require "config.php";
$sql = new mysqli('localhost',$config['login_bd'],$config['password_bd'],$config['login_bd']);

$queryString ="SELECT `date`, `electricity_day`, `electricity_night`, `cold_water`, `hot_water` FROM `indications`" ;
$responce = $sql->query($queryString);
$users = $responce->fetch_all(); 
$users = json_encode($users);
echo $users


?>