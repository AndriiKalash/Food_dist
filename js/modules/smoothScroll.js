import jump from 'jump.js'

//show upElem:
const smoothScroll = () => {
    const upElem = document.querySelector('.pageup');

    window.addEventListener('scroll', () => {
        if (document.documentElement.scrollTop > 500) {
            upElem.style.opacity = '1';
        } else {
            upElem.style.opacity = '0';
        }
    });

    // scroll
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    // console.log(anchorLinks);

    function smoothScrollTo() {
        const anchor = this.getAttribute('href');
        const jumpTarget = document.querySelector(anchor);
        if (jumpTarget) {
            jump(jumpTarget);
        } else {
            console.log('цель не найдена');
        }
    }

    anchorLinks.forEach(link => {
        link.addEventListener('click', smoothScrollTo);
    });



}

export default smoothScroll;