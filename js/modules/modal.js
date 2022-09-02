import calcScroll from '../services/calcScroll';
const scroll = calcScroll();

function modalClose(modalSelector) { //так как мы используем modal, созданный внутри другой функции , то мы его так же передадим как аргумент здесь
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hiden');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    document.body.style.marginRight = `0px`;
}

function madalOpen(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hiden');
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scroll}px`;

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }

}

function modal(openModalSelector, modalSelector, modalTimerId) {
    // ******************** click modal open

    const openModalBtn = document.querySelectorAll(openModalSelector),
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

export default modal;
export { modalClose };
export { madalOpen };