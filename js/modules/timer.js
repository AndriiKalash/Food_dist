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

export default timer;