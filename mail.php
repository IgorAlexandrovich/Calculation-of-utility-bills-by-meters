<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$payment = $_POST['payment'];
$mail_vvod = $_POST['mail'];
$config = require "config.php";

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = $config['mail']; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = $config['mail_pasword']; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom($config['mail']); // от кого будет уходить письмо?
$mail->addAddress($mail_vvod);     // Кому будет уходить письмо 
$mail->Subject = 'Сумма за коммуналку';
$mail->Body    = '' .$payment. ' рублей должны квартиранты за коммуналку ';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo $nameq; //header('location: thank-you.html');
}
?>
