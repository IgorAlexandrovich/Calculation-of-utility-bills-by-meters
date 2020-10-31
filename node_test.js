const mysql = require('mysql');
const config = require('./config'); // подключаем модуль с данными для входа
const http = require('http');
const { parse } = require('querystring');// для разбора строки пост запроса
//POST
http.createServer(
    (request, response) => {
  let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                console.log(body);
                 let params = parse(body);
                 console.log(params);
                 console.log(params.hi);
                response.end('ok');
            });
    }
).listen(3000);

     


const conn = mysql.createConnection(config);

conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено ");
    }
});

let query= "SELECT * FROM user_test WHERE BINARY login='igor' AND BINARY password='bar'";

conn.query(query, (err, result, field) =>{
    //console.log(err);
    console.log(result);
     // console.log(field);
});
 

