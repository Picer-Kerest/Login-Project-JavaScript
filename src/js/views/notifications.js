
function getContainer() {
    return document.querySelector('.notify-container');
}
// let notifyContainer = document.querySelector('.notify-container');
// Если писать через переменную, то она будет возвращать null при загрузке

function alertTemplate(msg, className, index) {
    // index будет отвечать за то, какой конкретно alert нужно удалить, чтобы удаление происходило по порядку
    return `
    <div class="alert ${className}" data-index="${index}">
      ${msg}
    </div>
    `;
}

function notifyContainerTemplate() {
    return `
    <div class="notify-container" style="position: fixed; top: 10px; right: 10px; z-index: 99;"></div>
<!--    z-index: 99 Выкидывает элемент на самый верхний слой-->
    `;
}


function createNotifyContainer() {
    const template = notifyContainerTemplate();
    document.body.insertAdjacentHTML('afterbegin', template);
}


function getAlertIndex() {
    return document.querySelectorAll('.notify-container .alert').length;
}

export function notify({ msg = 'Info message', className = 'alert-info', timeout = 2000 } = {}) {
//    Стандартное значение - пустой объект
    if (!getContainer()) {
        createNotifyContainer();
    }

    const index = getAlertIndex();
    const template = alertTemplate(msg, className, index);
    const container = getContainer();

    container.insertAdjacentHTML('beforeend', template);

    setTimeout(() => closeNotify(index), timeout);
}

export function closeNotify(index) {
    let alert;

    if (index === undefined) {
        alert = document.querySelector('.notify-container .alert');
    } else {
        alert = document.querySelector(`.notify-container .alert[data-index='${index}']`);
    //    alert у которого data-index = index
    }

    if (!alert) {
        console.warn('Alert not found');
        return;
    }

    const container = getContainer();
    container.removeChild(alert);
}