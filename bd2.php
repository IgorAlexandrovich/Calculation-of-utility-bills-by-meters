<?php

$date = ($_POST["date"]);
$electricity_day = ($_POST["electricity_day"]);
$electricity_night = ($_POST["electricity_night"]);
$hot_water= ($_POST["hot_water"]);
$cold_water = ($_POST["cold_water"]);
$config = require "config.php";


$sql = new mysqli('localhost',$config['login_bd'],$config['password_bd'],$config['login_bd']);

$queryString = "INSERT INTO `indications`(`date`, `electricity_day`, `electricity_night`, `hot_water`, `cold_water`) VALUES ('$date','$electricity_day','$electricity_night','$hot_water','$cold_water' )";
$responce = $sql->query($queryString);

if($responce){
    print 'готово';
  
}
else{
     print 'Что то пошло не так попробуйте перезагрузить страницу и попробовать еще раз!!!';//засунуть в переменную сообщение о результате и  в js выводить в зависимости от результата
}
?>