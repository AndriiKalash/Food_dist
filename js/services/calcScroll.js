function calcScroll() {
    let div = document.createElement('div');
    div.style.width = '50px'; // так как он пустой то скрол будет (у дива свой скрол)
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
}


export default calcScroll;