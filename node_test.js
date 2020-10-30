const mysql = require('mysql2/promise');
const config = require('./config'); // подключаем модуль с данными для входа

async function main() {
    const conn = await mysql.createConnection(config);// подключаемся к базе
    const rows = await conn.execute('SELECT * FROM `user_test` WHERE 1');//вытаскиваем нужную инфу из базы


    return rows
}

async function f() {
    let a = await main()
    console.log(a[0]);

}
f() 