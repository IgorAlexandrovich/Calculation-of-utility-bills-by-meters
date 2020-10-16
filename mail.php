<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$payment = $_POST['payment'];
$mail_vvod = $_POST['mail'];
$config = require "config.php";


//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = $config['mail']; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = $config['mail_pasword']; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom($config['mail']); // от кого будет уходить письмо?
$mail->addAddress($mail_vvod);     // Кому будет уходить письмо 
//$mail->addAddress('sn-@list.ru');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Сумма за комуналку';
$mail->Body    = '' .$payment. ' рублей должны квартиранты за комуналку ';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo $nameq; //header('location: thank-you.html');
}
?>
