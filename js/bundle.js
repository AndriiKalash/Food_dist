/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    // **************** Calculator

    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, activity;

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = 1.375;
        localStorage.setItem('activity', 1.375)
    }

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = "femail";
        localStorage.setItem('sex', 'femail');
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute('id') === localStorage.getItem('sex')) {
                element.classList.add(activeClass);
            }
            if (element.getAttribute('data-active') === localStorage.getItem('activity')) {
                element.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div ', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div ', 'calculating__choose-item_active');

    function calcResalt() {

        if (!sex || !height || !weight || !age || !activity) {
            result.textContent = '___';
            return
        }

        if (sex === 'femail') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        }
    }

    calcResalt();

    function getInputVal(selector) {

        const input = document.querySelector(selector);

        input.addEventListener('input', (e) => {

            if (input.value.match(/\D/g)) {
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            // switch (input.getAttribute('id')) {
            //     case 'height':
            //         height = +input.value;
            //         break;
            //     case 'weight':
            //         weight = +input.value;
            //         break;
            //     case 'age':
            //         age = +input.value;
            //         break;
            // }

            if (e.target.matches('#height')) {
                height = +input.value;

            }
            if (e.target.matches('#weight')) {
                weight = +e.target.value;
            }
            if (e.target.matches('#age')) {
                age = +e.target.value;
            }

            calcResalt();
        });

    }


    function getSexAndActivity(selector, activeClass) {

        const elements = document.querySelectorAll(selector);


        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-active')) {
                    activity = +e.target.getAttribute('data-active');
                    localStorage.setItem('activity', +e.target.getAttribute('data-active'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                elements.forEach(element => {
                    element.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcResalt();

            });

        });


    }

    getInputVal('#height');
    getInputVal('#weight');
    getInputVal('#age');
    getSexAndActivity('#gender div ', 'calculating__choose-item_active');
    getSexAndActivity('.calculating__choose_big div ', 'calculating__choose-item_active');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);




/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getItems)('http://localhost:3000/menu') //
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {
    // ****************************** POST Form

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => {
        bindPosData(form);
    });


    // const postData  // постинг данных:



    function bindPosData(form) {  // привязка постинга:
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                                          display: block;
                                          margin: 0 auto;
                                        `;
            form.insertAdjacentElement('afterend', statusMessage);


            const formData = new FormData(form);  // принимает данные с формы
            // const object = {};
            // formData.forEach(function (value, key) { // из экземляра FormData перезаписываем в json
            //     object[key] = value;
            // });
            // entries переделал formData в масив с масивами, а fromEntries создал обычный обьект и stringify перделал в json
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // fetch('server.php', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(object),

            // })

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json) //JSON.stringify(object))  // передал запрос через ф-цыю postData:
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        const modal = document.querySelector('.modal');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.madalOpen)('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                      <div class="modal__content">
                          <div data-close class="modal__close">&times;</div>
                          <div class="modal__title">${message}</div> 
                      </div>
         `;

        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalClose)('.modal');

        }, 4000);

    }


    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "madalOpen": () => (/* binding */ madalOpen),
/* harmony export */   "modalClose": () => (/* binding */ modalClose)
/* harmony export */ });

function modalClose(modalSelector) { //так как мы используем modal, созданный внутри другой функции , то мы его так же передадим как аргумент здесь
    const modal = document.querySelector(modalSelector);

    // modal.classList.add('hiden');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function madalOpen(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    // modal.classList.remove('hiden');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function modal(openModalSelector, modalSelector, modalTimerId) {
    // ******************** click modal open

    // const openModalBtn = document.querySelectorAll('[data-modal]'),
    //     // closeModalBtn = document.querySelector('[data-close]'),
    //     modal = document.querySelector('.modal');

    //  передал селекторы как аргументы в функцию , и при вызове в script.js их задал:
    const openModalBtn = document.querySelectorAll(openModalSelector),
        // closeModalBtn = document.querySelector('[data-close]'),
        modal = document.querySelector(modalSelector);


    openModalBtn.forEach(btn => {
        btn.addEventListener('click', () => madalOpen(modalSelector, modalTimerId));
    });

    // const modalTimerId = setTimeout(madalOpen, 30000);//перенес в script js 

    function openModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            (document.documentElement.scrollHeight - 1)) {
            madalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', openModalScroll);
        };

    }
    window.addEventListener('scroll', openModalScroll);


    // closeModalBtn.addEventListener('click', modalClose);

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            modalClose(modalSelector)
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector)
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ wrapper, field, slide, counterCntainer, nextArrow, prevArrow, totalCounter, currentCounter }) {
    // ******************* Slider 1 from arrey



    // ************** Slider 2 from html elements

    const parentCounter = document.querySelector(counterCntainer),
        prev = parentCounter.querySelector(prevArrow),
        current = parentCounter.querySelector(currentCounter),
        total = parentCounter.querySelector(totalCounter),
        next = parentCounter.querySelector(nextArrow),

        wrapperSlider = document.querySelector(wrapper),
        fieldSlider = wrapperSlider.querySelector(field),
        slider = wrapperSlider.querySelectorAll(slide);

    // slider.length < 10 ? total.innerHTML = `0${slider.length}` : slider.length;

    // sliderIndex = 1;

    // function showSlide() {

    //     if (sliderIndex > slider.length) {
    //         sliderIndex = 1;
    //     }
    //     if (sliderIndex < 1) {
    //         sliderIndex = slider.length
    //     }

    //     slider.forEach(slide => slide.classList.add('hide'));
    //     slider[sliderIndex - 1].classList.remove('hide');

    //     slider.length < 10 ? current.innerHTML = `0${sliderIndex}` : sliderIndex;

    // }

    // function changeSlide(n) {
    //     showSlide(sliderIndex += n);
    // }

    // showSlide();
    // prev.addEventListener('click', () => changeSlide(-1));
    // next.addEventListener('click', () => changeSlide(1));


    // *************** Slide 3 (Карусель)

    const width = window.getComputedStyle(wrapperSlider).width;

    fieldSlider.style.width = 100 * slider.length + '%';
    fieldSlider.style.display = 'flex';
    fieldSlider.style.transition = '0.5s all';

    wrapperSlider.style.overflow = 'hidden';

    slider.forEach(slide => {
        slide.style.width = width;
    });

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
        // +width.slice(0, width.length - 2)
    }

    let offset = 0;
    let sliderIndex = 1;
    const dots = [];

    slider.length < 10 ? total.innerHTML = `0${slider.length}` : slider.length;
    slider.length < 10 ? current.innerHTML = `0${sliderIndex}` : sliderIndex;

    function tornNextSlide() {
        if (offset == deleteNotDigits(width) * (slider.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        sliderIndex >= slider.length ? sliderIndex = 1 : sliderIndex++;

        fieldSlider.style.transform = `translateX(-${offset}px)`;

        slider.length < 10 ? current.innerHTML = `0${sliderIndex}` : sliderIndex;

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[sliderIndex - 1].style.opacity = 1;
    }

    const slideAuto = setInterval(tornNextSlide, 8000);

    next.addEventListener('click', () => {

        tornNextSlide();

        clearTimeout(slideAuto);
    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = deleteNotDigits(width) * (slider.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        sliderIndex <= 1 ? sliderIndex = slider.length : sliderIndex--;

        fieldSlider.style.transform = `translateX(-${offset}px)`;

        slider.length < 10 ? current.innerHTML = `0${sliderIndex}` : sliderIndex;

        dots.forEach(dot => dot.style.opacity = ".5");
        dots[sliderIndex - 1].style.opacity = 1;

        clearTimeout(slideAuto);
    });


    // ************* Navigation on slider . . . .

    wrapperSlider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    wrapperSlider.append(indicators);


    for (let i = 0; i < slider.length; i++) {

        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        if (i == 0) {

            dot.style.opacity = 1;
        }

        dots.push(dot);

        indicators.append(dot);

    }


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            sliderIndex = slideTo; // для смены счетчика

            // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            offset = deleteNotDigits(width) * (slideTo - 1);

            fieldSlider.style.transform = `translateX(-${offset}px)`;

            slider.length < 10 ? current.innerHTML = `0${sliderIndex}` : sliderIndex;

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[sliderIndex - 1].style.opacity = 1;

            clearTimeout(slideAuto);
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsParentSelector, tabsSelector, tabContantSelector, activeClass) {
    //*****************  Tabs

    const tabsParent = document.querySelector(tabsParentSelector),
        tabs = tabsParent.querySelectorAll(tabsSelector),
        tabContant = document.querySelectorAll(tabContantSelector);

    function hideTabContent() {
        tabContant.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }

    function showTabContent(i = 0) {
        tabContant[i].classList.add('show', 'fade');
        tabContant[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    //Делегирование  в Tabs
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    //****************  Timer

    // const deadLine = '2022-09-16';
    const deadLine = new Date('2022-08-31');

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        // получаю разницу в милисекундах
        const t = endtime - new Date();

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;

        } else {
            // милисекунды нужно превратить а количетво дней и часов и минут
            // Math.floor округлит до ближайшего целого
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / (1000 * 60) % 60)),
                seconds = Math.floor((t / 1000) % 60);
        }

        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            // теперь t это обьект со всеми значениями 
            const t = getTimeRemaining(endtime);
            // расчетные величины помещаем на страницу
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);

            }
        }
    }

    setClock('.timer', deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getItems": () => (/* binding */ getItems),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {  // постинг данных для form
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json();
};


const getItems = async (url) => {  // получение данных для cards
    const res = await fetch(url);
    //проверка на ошибки запроса, так как промис fetch не выдает ошибки в catch, а только при отсутствии интернета
    if (!res.ok) { //свойство промиса от fetch 
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");











window.addEventListener('DOMContentLoaded', (e) => {

    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.madalOpen)('.modal', modalTimerId), 30000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__["default"])({
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        counterCntainer: '.offer__slider-counter',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current'

    });
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '.modal', modalTimerId);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();





});




})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map