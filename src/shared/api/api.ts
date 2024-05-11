import { createAxiosDateTransformer } from "axios-date-transformer";
import { store } from "../../app/store/store";
import { logOut, setTokens } from "../../features/authorization/authSlice";
import { isAxiosError } from "axios";

export const $baseURL = "http://82.97.249.229:8080"

export const $api = createAxiosDateTransformer({
    baseURL: $baseURL,
    headers: {
        "ngrok-skip-browser-warning" : "69420"
    }
})

$api.interceptors.request.use(
    config => {
        const token = store.getState().auth.tokens.accessToken;
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refToken = localStorage.getItem("refreshToken")

                // Вызов API для обновления access и refresh токенов
                const response = await $api.post('/api/token', { value: refToken });
                const { accessToken, refreshToken } = response.data;

                store.dispatch(setTokens({ accessToken, refreshToken }));

                originalRequest.headers.Authorization = `${accessToken}`;
                return $api(originalRequest);
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response?.status === 404) {
                        store.dispatch(logOut())
                    }
                    if (error.response?.status === 400) {
                        alert('Нет доступа')
                    }
                }
                else {
                    store.dispatch(logOut())
                    alert('Ошибка обновления токенов')
                }
            }
        }

        return Promise.reject(error);
    }
);