import axios from '../plugins/axios';

export async function login(email, password) {
    try {
        const response = await axios.post(
            `/auth/login`,
            JSON.stringify({ email, password }),
    );
        console.log(response);
        return response.data;
    //    return response.data; Возвращает код, состояние и тело объекта
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    //    reject == throw, just async
    }
}