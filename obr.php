<?php


$login = $_POST['login'];
$password = $_POST['password'];
var_dump ($_POST);

$config = require "config.php";
$sql = new mysqli('localhost',$config['login_bd'],$config['password_bd'],$config['login_bd']);

?>