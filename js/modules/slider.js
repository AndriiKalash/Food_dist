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

export default slider;