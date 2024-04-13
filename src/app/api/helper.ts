export function parseJwt(token: string) {
    const base64Url = token.split('.')[1]; // Получаем полезную нагрузку
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Преобразуем в обычный Base64
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}