import { createSignal } from "solid-js";

function LoginFormGraphQL() {
    const [name, setName] = createSignal("");
    const [password, setPassword] = createSignal("");

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        // Предполагаемая мутация для логина
        const query = `
            mutation {
                login(input: {
                    name: "${name()}",
                    password: "${password()}"
                }) {
                    player {
                        id
                        name
                        // Другие поля, которые могут быть возвращены после логина
                    }
                    token // Предполагаем, что API возвращает токен аутентификации
                }
            }
        `;

        try {
            const response = await fetch("http://pike.loc/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();
            console.log(result);

            // Обработка результатов логина (например, сохранение токена аутентификации)
        } catch (error) {
            console.error("Ошибка при логине:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onInput={(e) => setName(e.target.value)} value={name()} />
            <input type="password" placeholder="Password"  autocomplete="current-password" onInput={(e) => setPassword(e.target.value)} value={password()} />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginFormGraphQL;
