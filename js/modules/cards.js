import { getItems } from "../services/services";

function cards() {
    // ********************************  class Menu для карточек и получение их с бекЭнд





    // const imgMenu = [
    //     'img/tabs/vegy.jpg',
    //     'img/tabs/elite.jpg',
    //     'img/tabs/post.jpg'
    // ];

    // const textMenu = [
    //     "это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальнойценой и высоким качеством!",
    //     "мы используем не только красивый дизайн упаковки, но  и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    //     "это тщательный подбор ингредиентов: полное отсутствие  продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное   количество белков за счет тофу и импортных вегетарианских стейков."
    // ]


    class MenuCard {
        constructor(src, altimg, title, text, price, parentElement, ...classes) {
            this.src = src;
            this.altimg = altimg;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parent = document.querySelector(parentElement);
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }
        showTipeMenu() {
            return `Меню "${this.title}"`
        }
        changeToUAH() {
            return this.price *= this.transfer;
        }
        renderMenu() {

            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes)
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML +=
                `
             <img src = ${this.src} alt= ${this.altimg}>
             <h3 class="menu__item-subtitle">${this.showTipeMenu()}</h3>
             <div class="menu__item-descr">Меню "${this.title}" ${this.text} </div>
             <div class="menu__item-divider"></div>
         <div class="menu__item-price">
             <div class="menu__item-cost">Цена:</div>
             <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>   
            `;

            this.parent.append(element);
        }

    }


    // получение данных в services :


    // способ рендера через шаблон class:

    getItems('http://localhost:3000/menu') //
        .then(data => { //рез. функции(наш массив из db.json)
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', "menu__item").renderMenu();
            });
        });

    // axios подключил ссылкой в конец html файла
    // axios.get('http://localhost:3000/menu') //axios, function getItems тогда не нужна (тут все автоматически)
    //     .then(data => {
    //         data.data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container', "menu__item").renderMenu();
    //         });
    //     });


    // способ рендера без шаблонизации в class(class MenuCard можно удалить ) :

    // getItems('http://localhost:3000/menu')
    //     .then(data => createCardData(data));

    // function createCardData(data) {
    //     data.forEach(({ img, altimg, title, descr, price }) => {
    //         const card = document.createElement('div');
    //         card.classList.add("menu__item");
    //         card.innerHTML = `
    //                    <img src = ${img} alt= ${altimg}>
    //                    <h3 class="menu__item-subtitle">Меню</h3>
    //                    <div class="menu__item-descr">Меню "${title}" ${descr} </div>
    //                    <div class="menu__item-divider"></div>
    //                <div class="menu__item-price">
    //                    <div class="menu__item-cost">Цена:</div>
    //                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //               </div>   
    //          `;

    //         document.querySelector('.menu .container').append(card);
    //     });
    // }


    // пример создание обьекта для конструктора class:

    // const fitness = new MenuCard(imgMenu[0], 'Фитнесс', textMenu[0], 229, ".menu__field .container");
    // new MenuCard(
    //     imgMenu[0],
    //     'Фитнесс',
    //     textMenu[0],
    //     9,
    //     ".menu__field .container",
    //     // "menu__item", "big"
    // ).renderMenu();

    // new MenuCard(
    //     imgMenu[1],
    //     'Премиум',
    //     textMenu[1],
    //     14,
    //     ".menu__field .container",
    //     "menu__item"
    // ).renderMenu();

    // new MenuCard(
    //     imgMenu[2],
    //     'Постное',
    //     textMenu[2],
    //     21,
    //     ".menu__field .container",
    //     "menu__item"
    // ).renderMenu();

    // fitness.renderMenu();
    // premium.renderMenu();
    // postnoye.renderMenu();
}

export default cards;