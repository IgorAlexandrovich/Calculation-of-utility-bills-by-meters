const mysql = require('mysql');
const config = require('./config'); // подключаем модуль с данными для входа
const http = require('http');
const { parse } = require('querystring');// для разбора строки пост запроса


http.createServer((request, response) => {
  let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                 let params = parse(body);     
                
               check (params.login,params.password)
            });

function check (login,password) {
    let query= `SELECT * FROM user_test WHERE BINARY login='${login}' AND BINARY password='${password}'`;

conn.query(query, (err, result, field) =>{
    console.log(result[0]);// приходит либо пустой либо с данными если есть
if (result[0]){
    console.log(` Вы ${result[0].login}  авторизованны`)
    check_open(result[0].login)
}
else{
    console.log('вы не авторизованы');
    response.end('вы не авторизованы')
}


});
}

function check_open(log){
    let query= "SELECT `date`, `electricity_day`, `electricity_night`, `cold_water`, `hot_water`, `id` FROM "+log ;
    conn.query(query, (err, result, field) =>{

         response.end(JSON.stringify(result[0]))
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

    }
   
).listen(3001);

     



 

