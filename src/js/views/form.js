function inputErrorTemplate(msg) {
    return `
    <div class="invalid-feedback">${msg}</div>
    `;
//    class="form-control"
//    Важное условие. У input'a
}


export function showInputError(el) {
//    https://getbootstrap.com/docs/4.0/components/forms/#validation
//    Доки по валидации форм
//    <div class="valid-feedback"> Класс для отображения ошибки снизу инпута
    const parent = el.parentElement;
//    Родитель это div с input'ом
//    Ищем родителя
    const msg = el.dataset.invalidMessage || 'Invalid Input';
    // Берём сообщение
    const template = inputErrorTemplate(msg);
    // Формируем ошибку
    el.classList.add('is-invalid');
    // Чтобы отображало ошибку и красило красным
    parent.insertAdjacentHTML('beforeend', template);
//    Добавляем сообщение в перед закрывающим тэгом div
}

export function removeInputError(el) {
    const parent = el.parentElement;
    const err = parent.querySelector('.invalid-feedback');
    if (!err) return;

    el.classList.remove('is-invalid');
    parent.removeChild(err);
}