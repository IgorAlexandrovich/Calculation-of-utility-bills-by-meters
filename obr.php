<?php


$login = $_POST['login'];
$password = $_POST['password'];

@$db = new mysqli('localhost', 'root', '', 'root');
if (!$db->connect_errno) {
 echo 'Подключение успешно установлено';
 // Выполняем работу с базой данных
 $db->close(); // Закрываем соединение
}
else {
 echo 'Не удалось установить подключение к базе данных:<br>';
 echo 'ошибка (' . $db->connect_errno . ') ';
 echo $db->connect_error;
}

$queryString = 'INSERT INTO `user_test`(`login`, `password`) VALUES ($login,$password)'
?>