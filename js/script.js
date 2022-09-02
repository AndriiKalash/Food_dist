import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import form from './modules/form';
import modal from './modules/modal';
import cards from './modules/cards';
import calculator from './modules/calculator';
import { madalOpen } from "./modules/modal";
import smoothScroll from './modules/smoothScroll';



window.addEventListener('DOMContentLoaded', (e) => {

    const modalTimerId = setTimeout(() => madalOpen('.modal', modalTimerId), 30000);

    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    timer();
    slider({

        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        slide: '.offer__slide',
        counterCntainer: '.offer__slider-counter',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current'

    });
    form('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    cards();
    calculator();
    smoothScroll();





});



