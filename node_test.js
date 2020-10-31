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
                //console.log(body);
                 let params = parse(body);
                 //console.log(params.login);
                // console.log(params.password);
                //response.end('ok');
                
                check (params.login,params.password)
            });
    }
).listen(3000);

     
function check (login,password) {
    let query= `SELECT * FROM user_test WHERE BINARY login='${login}' AND BINARY password='${password}'`;

conn.query(query, (err, result, field) =>{
   //console.log(err);
    console.log(result);// приходит либо пустой либо с данными если есть
    // console.log(field);
});
}

const conn = mysql.createConnection(config);

conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено ");
    }
});


 

