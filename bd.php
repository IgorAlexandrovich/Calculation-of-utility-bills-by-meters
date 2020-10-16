<?php

$sql = new mysqli('localhost','i90571vk_bd','A141987a','i90571vk_bd');

$queryString ="SELECT `date`, `electricity_day`, `electricity_night`, `hot_water`, `cold_water` FROM `indications`" ;
$responce = $sql->query($queryString);
$users = $responce->fetch_all(); 
$users = json_encode($users);
echo $users


?>