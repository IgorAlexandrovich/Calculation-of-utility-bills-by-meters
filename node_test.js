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
        // прописать условие регистрация или авторизация открывать соединение с БД и в случае 1 запускать функцию регистрации, в случае 2 запускать функцию авторизации
        connection_to_db(params.login, params.password)
    });
    
     const conn = mysql.createConnection(config); 

    function connection_to_db(login, password) {
        let query = `SELECT * FROM user_test WHERE BINARY login='${login}' AND BINARY password='${password}'`;//создаем запрос в БД
  
        conn.connect(function (err) {
            if (err) {
                return console.error("Ошибка: " + err.message);
            }
            else {
                console.log("Подключение к серверу MySQL успешно установлено ");
            }
        });authorization (query)
        }// открываем доступ к БД
        
        function authorization (query){
              conn.query(query, (err, result, field) => {
            console.log(result[0]);// приходит либо пустой либо с данными если есть
            if (result[0]) {
                console.log(` Вы ${result[0].login}  авторизованны`)
               // report ()
                 //check_open(result[0].login)
            }
            else {
                console.log('вы не авторизованы');
                response.end('вы не авторизованы')
                del()
            }


        });
        }// функция авторизации 
      

        //  as_v_bd('test111') 
        //  function as_v_bd(new_name_tabl) {
           
        //     let query = "CREATE TABLE `test_baze`.`" + new_name_tabl +"` ( `date` VARCHAR(20) NOT NULL , `electricity_day` VARCHAR(8) NOT NULL , `electricity_night` VARCHAR(8) NOT NULL , `cold_water` VARCHAR(8) NOT NULL , `hot_water` VARCHAR(15) NOT NULL , `id` VARCHAR(11) NOT NULL ) ENGINE = InnoDB"; conn.query(query, (err, result, field) => {

        //        console.log(field)
        //        console.log(result)
        //        console.log(err)
        //     })}; // функция  запись в БД новой таблицы с показаниями пользователя при регистрации

    function check_open(log) {
        let query = "SELECT `date`, `electricity_day`, `electricity_night`, `cold_water`, `hot_water`, `id` FROM " + log;
       // console.log(query)
         conn.query(query, (err, result, field) => {

             response.end(JSON.stringify(result[0]))}
          ) };
          
          function del (name_table){
              let query = "DROP TABLE" + name_table
              conn.query (query)
          }// удаляет таблицу полностью принимает параметр имя таблицы
}

).listen(3001);







