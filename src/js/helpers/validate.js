const regExpDic = {
    email: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/,
    password: /^[0-9a-zA-Z]{4,}$/,
};


// data-required это datasetx
/**
 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid or doesn't have data-required attr
 */
export function validate(el) {
    const regExpName = el.dataset.required;
    // regExpName = email || password

    if (!regExpDic[regExpName]) return true;
//    Если в словаре нет регулярного выражения под этот input, то
//    Возвращаем true, потому что input не требует валидации
//    потому что нет регулярного выражения
//    Иначе говоря если есть другие input'ы, то мы их пропускаем
//    Метод test() выполняет поиск сопоставления регулярного выражения указанной строке.

    return regExpDic[regExpName].test(el.value);
//    Вставляем то, что введено в форму и проверяем на соответствие регулярному выражению

}

