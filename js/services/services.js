const postData = async (url, data) => {  // постинг данных для form
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });
    return await res.json();
};


const getItems = async (url) => {  // получение данных для cards
    const res = await fetch(url);
    //проверка на ошибки запроса, так как промис fetch не выдает ошибки в catch, а только при отсутствии интернета
    if (!res.ok) { //свойство промиса от fetch 
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
};

export { postData };
export { getItems };

