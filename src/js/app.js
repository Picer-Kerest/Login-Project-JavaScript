import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';

const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];

// Events
form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
})

inputs.forEach(el => {
    el.addEventListener('focus', e => removeInputError(el))
});

// Handers
async function onSubmit() {
    // Если форма валидна, то отправляем запрос на сервер
//    Если форма невалидна, то запрос не отправляем
//    Валидна тогда, когда все инпуты заполнены правильно
    const isValidForm = inputs.every(el => {
        // Если хотя бы один инпут невалиден, тогда every вернёт False всей форме
        // Если email неверный, то форма сразу же отвалится
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }

        return isValidInput;
    });

    if (!isValidForm) return;
//    Метод every() проверяет, удовлетворяют ли все элементы массива условию, заданному в передаваемой функции

    try {
        await login(inputEmail.value, inputPassword.value);
        await getNews();
        form.reset();
        notify({msg: 'Login Success', className: 'alert-success'})
    //    Для сбрасывания формы после регистрации
    } catch (err) {
        notify({msg: 'Login Failed', className: 'alert-danger'})
    }
}