import { config } from "../../config";

type FetchOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
}

export async function fetchWithAuth(url: RequestInfo | URL, options: FetchOptions = {}) {
    const token = localStorage.getItem("authToken");
    if (!token) {
        console.error("Токен не найден, выполните вход.");
        return;
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    // Делаем запрос с новыми заголовками
    const response = await fetch(url, { ...options, headers });
    return response.json();
}

export async function authRequest(username: string, password: string) {
    try {
        const response = await fetch(config.apiURL + "auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({username, password})
        });

        const result = await response.json();
        console.log(result);
        
        if (response.ok && result.token) {
            // Сохранение токена в LocalStorage
            localStorage.setItem("authToken", result.token);
            return result.token
        } else {
            // Обработка ошибок аутентификации
            console.error("Auth request error:", result.message);
            return false
        }
    } catch (error) {
        console.error("Auth error:", error);
    }
}