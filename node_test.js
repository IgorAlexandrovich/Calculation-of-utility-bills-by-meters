const mysql = require('mysql');
const config = require('./config'); // подключаем модуль с данными для входа


const conn = mysql.createConnection(config);

conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено ");
    }
});

let query="SELECT * FROM user_test";

conn.query(query, (err, result, field) =>{
    console.log(err);
    console.log(result);
     // console.log(field);
});
 