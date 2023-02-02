import {re} from "@babel/core/lib/vendor/import-meta-resolve";

const lsTokenKey = 'my_app_token';
// Ключ, под которым хранится token в local storage

function setToken(req) {
//    Установление токена при запросах.
//    Уходит на любой адрес, кроме аутентификации
    const inAuthUrl = req.url.includes('auth');
    if (!inAuthUrl) {
        const token = localStorage.getItem(lsTokenKey);
        req.headers['x-access-token'] = token;
    //    Для данного сервера такой заголовок.
    }
    return req;
}

function setTokenOnLogin(res) {
//    Каждый interceptor возвращает то, что принимает
//    Если произошёл успешный запрос на адрес login, то мы добавляем
//    token в local storage
    const inLoginUrl = res.config.url.includes('login');
    if (inLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(lsTokenKey, token);
    }
    return res;
}

function getClearResponse(res) {
//    Получаем чистые данные
    return res.data;
//    Ставим последним в списке interceptor'ов, потому что мы возвращаем данные от сервера
}

function onError(err) {
    // Делаем reject, чтобы отработал try/catch
    console.dir(err);
    return Promise.reject();
}

export default function(axios) {
    axios.interceptors.request.use(setToken);
//    Принимает экземпляр axios
//    Так как мы импортируем один элемент, то имя ему можно не давать
//    Но при импорте даём произвольное имя
    axios.interceptors.response.use(setTokenOnLogin);
//    Навешиваем interceptor
    axios.interceptors.response.use(getClearResponse, onError);
//    getClearResponse если без ошибок
//    onError если с ошибками
}