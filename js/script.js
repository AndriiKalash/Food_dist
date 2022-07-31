

window.addEventListener('DOMContentLoaded', (e) => {


    //*****************  Tabs

    const tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item'),
        tabContant = document.querySelectorAll('.tabcontent');

    function hideTabContent() {
        tabContant.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });

    }

    function showTabContent(i = 0) {
        tabContant[i].classList.add('show', 'fade');
        tabContant[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
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


    function setClock(endtime) {
        const timer = document.querySelector('.timer'),
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

    setClock(deadLine);

    // ******************** click modal open

    const openModalBtn = document.querySelectorAll('[data-modal]'),
        // closeModalBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    function madalOpen() {
        modal.classList.add('show');
        // modal.classList.remove('hiden');
        document.body.style.overflow = 'hidden';
        clearInterval(timerOpenId);
    }

    openModalBtn.forEach(btn => {
        btn.addEventListener('click', madalOpen);
    });

    const timerOpenId = setTimeout(madalOpen, 30000);

    function openModalScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            (document.documentElement.scrollHeight - 1)) {
            madalOpen();
            window.removeEventListener('scroll', openModalScroll);
        };

    }
    window.addEventListener('scroll', openModalScroll);


    function modalClose() {
        // modal.classList.add('hiden');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // closeModalBtn.addEventListener('click', modalClose);

    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close') == '') {
            modalClose()
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose()
        }
    });

    // ********************************  class Menu для карточек и получение их с бекЭнд





    const imgMenu = [
        'img/tabs/vegy.jpg',
        'img/tabs/elite.jpg',
        'img/tabs/post.jpg'
    ];

    const textMenu = [
        "это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальнойценой и высоким качеством!",
        "мы используем не только красивый дизайн упаковки, но  и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        "это тщательный подбор ингредиентов: полное отсутствие  продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное   количество белков за счет тофу и импортных вегетарианских стейков."
    ]


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

    const getItems = async (url) => {  // получение данных:
        const res = await fetch(url);
        //проверка на ошибки запроса, так как промис fetch не выдает ошибки в catch, а только при отсутствии интернета
        if (!res.ok) { //свойство промиса от fetch 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    // способ рендера через шаблон class:

    // getItems('http://localhost:3000/menu') //
    //     .then(data => { //рез. функции(наш массив из db.json)
    //         data.forEach(({ img, altimg, title, descr, price }) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container', "menu__item").renderMenu();
    //         });
    //     });

    // axios подключил ссылкой в конец html файла
    axios.get('http://localhost:3000/menu') //axios, function getItems тогда не нужна (тут все автоматически)
        .then(data => {
            data.data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container', "menu__item").renderMenu();
            });
        });

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


    // ****************************** POST Form

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(form => {
        bindPosData(form);
    });


    const postData = async (url, data) => {  // постинг данных:
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };


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

            postData('http://localhost:3000/requests', json) //JSON.stringify(object))  // передал запрос через ф-цыю postData:
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

        prevModalDialog.classList.add('hide');
        madalOpen();

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
            modalClose();

        }, 4000);

    }


    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));


    // ******************* Slider 1 from arrey

    // const parentCounter = document.querySelector('.offer__slider-counter'),
    //     prev = parentCounter.querySelector('.offer__slider-prev'),
    //     current = parentCounter.querySelector('#current'),
    //     total = parentCounter.querySelector('#total'),
    //     next = parentCounter.querySelector('.offer__slider-next'),
    //     slider = document.querySelector('.offer__slide img');


    // const imgSlider = [
    //     "img/slider/pepper.jpg",
    //     "img/slider/food-12.jpg",
    //     "img/slider/olive-oil.jpg",
    //     "img/slider/paprika.jpg",
    //     "img/slider/pepper.jpg",
    //     "img/slider/food-12.jpg",
    //     "img/slider/olive-oil.jpg",
    //     "img/slider/paprika.jpg",
    //     "img/slider/pepper.jpg",
    //     "img/slider/food-12.jpg",
    //     "img/slider/olive-oil.jpg",
    //     "img/slider/paprika.jpg"
    // ]

    // let slideIndex = 0;


    // function getZero(num) {      функция взята из таймера
    //     if (num >= 0 && num < 10) {
    //         return `0${num}`;
    //     } else {
    //         return num;
    //     }
    // }


    // function currentValue() {

    //     current.innerHTML = getZero(slideIndex + 1);
    // }

    // function nextSlide() {
    //     slideIndex++;
    //     if (slideIndex >= imgSlider.length) {
    //         slideIndex = 0;
    //     }
    //     slider.src = imgSlider[slideIndex];

    //     currentValue();
    // }

    // function prevSlide() {
    //     slideIndex--;
    //     if (slideIndex < 0) {
    //         slideIndex = imgSlider.length - 1;
    //     }
    //     slider.src = imgSlider[slideIndex];

    //     currentValue();
    // }

    // currentValue();
    // total.innerHTML = getZero(imgSlider.length);
    // prev.addEventListener('click', prevSlide);
    // next.addEventListener('click', nextSlide);

    // ************** Slider 2 from html elements

    const parentCounter = document.querySelector('.offer__slider-counter'),
        prev = parentCounter.querySelector('.offer__slider-prev'),
        current = parentCounter.querySelector('#current'),
        total = parentCounter.querySelector('#total'),
        next = parentCounter.querySelector('.offer__slider-next'),

        wrapperSlider = document.querySelector('.offer__slider-wrapper'),
        fieldSlider = wrapperSlider.querySelector('.offer__slider-inner'),
        slider = wrapperSlider.querySelectorAll('.offer__slide');

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

            sliderIndex = slideTo;
            // offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            offset = deleteNotDigits(width) * (slideTo - 1);

            fieldSlider.style.transform = `translateX(-${offset}px)`;

            slider.length < 10 ? current.innerHTML = `0${sliderIndex}` : sliderIndex;

            dots.forEach(dot => dot.style.opacity = ".5");
            dots[sliderIndex - 1].style.opacity = 1;

            clearTimeout(slideAuto);
        });
    });











});



