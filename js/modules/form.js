import { modalClose, madalOpen } from './modal'
import { postData } from "../services/services";

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
        const modal = document.querySelector('.modal');

        prevModalDialog.classList.add('hide');
        madalOpen('.modal', modalTimerId);

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
            modalClose('.modal');

        }, 4000);

    }


    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}

export default form;
