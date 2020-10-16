<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form action="bd2.php">
        <input type="date" class="data_entry" required>
        <label for="">Введите дату</label> <br>
        <input type="namber" class="data_entry" required pattern="^[0-9]+$">
        <label for="">Введите показания электроэнергии день</label> <br>
        <input type="text" class="data_entry" required pattern="^[0-9]+$">
        <label for="">Введите показания электроэнергии ночь</label> <br>
        <input type="text" class="data_entry" required pattern="\d+(\.\d{3})?">
        <label for="">Введите показания холодной воды</label> <br>
        <input type="text" class="data_entry" required pattern="\d+(\.\d{3})?">
        <label for="">Введите показания горячей воды</label> <br>
        <input type="submit" id="button" value = "передать показания"><br>
        <label for=""> Ввдите почту для отправки копии</label><br>
        <input type="mail" id="mail">
        
    </form>
    <div class="container">
    </div>
    <script>

        let price = new Data(0, 5.6, 1.63, 205.15, 42.3, 30.9);
        receiving('reception');// подгрузка данных  из БД
        const form = document.querySelector('form');
        const data_entry = document.querySelectorAll('.data_entry');
        const container = document.querySelector('.container');
        const mail = document.querySelector('#mail');
        let indication;// новые показания
        let previous_indication = new Data(0, 0, 0, 0, 0);// предыдущие показания
        let result;// обьект вычетание нов из старого
        let itog; // обьект конечные цены 
        let summa; // сумма к оплате

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            new_indication();
            result_calculation();
            itog_calculation()
            summarize()

            let result = confirm('Сумма к оплате составляет ' + summa + ' рублей.');
            if (result) {
                container.innerHTML = '<h3 >Оплата составляет</h3> <b>' + summa + "</b> Рублей" + ' за ' + indication.date;// переписываем инфу контейнера на нужный нам текст
                receiving('forma')//передача в БД
                receiving('reception')
                receiving('mail')
                form.innerHTML = '<p> <strong>Показания успешно переданы</strong></p>';
                
            }
            else {
                alert('введите показания заново');
                receiving('reception');
            }
        });// создаем  обьект с новыми показаниями + вставить выввод итога и отправку в БД нов показ

        async function receiving(a) {

            if (a === 'reception') {
                let responce = await fetch('bd.php');
                let text = await responce.json()
                text = text[text.length - 1];
                let arr = [];
                for (let i = 1; i < text.length - 1; i++) {
                    arr.push(text[i])
                }// формирую для конструктора из предыдущие показания -->
                let count1 = 0;
                let count = 1;
                for (let i in previous_indication) {
                    previous_indication[i] = text[count1]
                    count1++
                    data_entry[count].placeholder = text[count];
                    count++
                }//записывает в обьект данные из БД
            }
            if (a === 'forma') {

                let forma_request = '';
                for (let i in indication) {
                    forma_request += i + '=' + indication[i] + "&"
                }

                let option = {
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: forma_request
                }
                let responce = await fetch('bd2.php', option);
                let text = await responce.text()

            }
            
            if(a === 'mail'){
                
                  let option = {
                    method: "post",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "payment=" + summa + '&' + 'mail=' + mail.value
                }
                let responce = await fetch('mail.php', option);
                let text = await responce.text()
            }
        }


        function result_calculation() {
            let date = indication.date
            let electricity_day = indication.electricity_day - previous_indication.electricity_day;
            let electricity_night = indication.electricity_night - previous_indication.electricity_night;
            let hot_water = indication.hot_water - previous_indication.hot_water;
            let cold_water = indication.cold_water - previous_indication.cold_water;
            let water_disposal = hot_water + cold_water
            result = new Data(date, electricity_day, electricity_night, hot_water, cold_water, water_disposal);
            return result

        } // вычитаем из старых данных новые и формируем данные для умножение на тарифы
        function itog_calculation() {
            let date = indication.date
            let electricity_day = +((price.electricity_day * result.electricity_day).toFixed(2));
            let electricity_night = +((price.electricity_night * result.electricity_night).toFixed(2));
            let hot_water = +((price.hot_water * result.hot_water).toFixed(2));
            let cold_water = +((price.cold_water * result.cold_water).toFixed(2));
            let water_disposal = +((price.water_disposal * result.water_disposal).toFixed(2));
            itog = new Data(date, electricity_day, electricity_night, hot_water, cold_water, water_disposal);

            return itog

        } // умнажаем результат на прайс и получаем конечную сумму.


        function new_indication() {
            let arr = [];
            for (let i = 0; i < data_entry.length; i++) {
                arr.push(data_entry[i].value)
            }
            indication = new Data(arr[0], arr[1], arr[2], arr[4], arr[3]);
            return indication

        }

        function Data(indication_date, indication_electricity_day, indication_electricity_night, indication_hot_water, indication_cold_water, water_disposal) {
            this.date = indication_date;
            this.electricity_day = indication_electricity_day;
            this.electricity_night = indication_electricity_night;
            this.hot_water = indication_hot_water;
            this.cold_water = indication_cold_water;
            this.water_disposal = water_disposal;

        }
        function summarize() {
            summa = (itog.electricity_day + itog.electricity_night + itog.hot_water + itog.cold_water + itog.water_disposal).toFixed(2);

            return summa
        }

    </script>
</body>

</html>
