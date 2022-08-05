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

export default calculator;


