import { createSignal } from "solid-js";

function LoginForm() {
    const [name, setName] = createSignal("");
    const [password, setPassword] = createSignal("");

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        // Предполагаемая мутация для логина
        const query = {
            username: name(),
            password: password(),
        };

        try {
            const response = await fetch("http://pike.loc/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(query)
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

export default LoginForm;
