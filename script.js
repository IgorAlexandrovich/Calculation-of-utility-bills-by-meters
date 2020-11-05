
const text_wrapper = document.querySelector('.text_wrapper');
const button_open_close_text = document.querySelector('.button_open_close_text');
const extension1 = document.querySelector('.extension');
const up = document.querySelector('.up');
button_open_close_text.addEventListener('click', () => {
    text_wrapper.classList.toggle('text_wrapper_hide');

    extension_switch()
})

function extension_switch() {
    extension1.classList.toggle('extension_none');
    button_open_close_text.classList.add('extension_none')


}

const a = document.querySelector('.a')
const img_voda = document.querySelector('.img_voda')
const img_electr = document.querySelector('.img_electr')
const button_prompt = document.querySelectorAll('.button_prompt')
const modal = document.querySelector('.modal');
const button_close = document.querySelector('.button_close')
button_close.addEventListener('click', function () {

    modal_toggle(modal)
    img_electr.classList.remove('a')
    img_voda.classList.remove('a')
})
button_prompt[0].addEventListener('click', function () {

    modal_toggle(modal)

    img_electr.classList.toggle('a')

})
button_prompt[1].addEventListener('click', function () {

    modal_toggle(modal)

    img_voda.classList.toggle('a')

})


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
console.log(price)
form.addEventListener("submit", function (event) {
    event.preventDefault();

    new_indication();
    result_calculation();
    itog_calculation()
    summarize()

    let result = confirm('Сумма к оплате составляет ' + summa + ' рублей. Для изменения показаний нажмите "Отмена"  Для передачи нажмите "ОК"');
    if (result) {
        container.innerHTML = '<h3 >Оплата составляет</h3> <b>' + summa + "</b> Рублей" + ' за ' + indication.date;// переписываем инфу контейнера на нужный нам текст
        receiving('forma')//передача в БД
        receiving('reception')
        receiving('mail')
        form.reset();

    }
    else {

        receiving('reception');
    }
});// создаем  обьект с новыми показаниями + вставить выввод итога и отправку в БД нов показ

async function receiving(a) {

    if (a === 'reception') {
        let responce = await fetch('bd.php');
        let text = await responce.json()
        console.log(text)

        text = text[text.length - 1];// берется последняя запись

        let count1 = 0;
        let count = 1;// счетчик плейсхолдера с 1 чтоб не вписывать дату
        for (let i in previous_indication) {


            previous_indication[i] = text[count1]
            count1++
            if (data_entry[count] === undefined) {
                break

            }
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

    if (a === 'mail') {

        let option = {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "payment=" + summa + '&' + 'mail=' + mail.value + '&' + 'date=' + indication.date
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
    indication = new Data(arr[0], arr[1], arr[2], arr[3], arr[4]);
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
function modal_toggle(el) {
    el.classList.toggle('modal_block')
}


