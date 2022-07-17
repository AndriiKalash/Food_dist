

window.addEventListener('DOMContentLoaded', (e) => {

    // Tabs

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

    // Timer

    // const deadLine = '2022-09-16';
    const deadLine = new Date('2022-07-18');

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
        closeModalBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    openModalBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hiden');
            document.body.style.overflow = 'hidden';
        });
    });

    function modalClose() {
        modal.classList.add('hiden');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeModalBtn.addEventListener('click', modalClose);

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            modalClose()
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            modalClose()
        }
    });






});



