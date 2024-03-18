import { createSignal } from "solid-js";

function RegisterForm() {
    const [username, setUsername] = createSignal("");
    const [password, setPassword] = createSignal("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://pike.loc/api/users/register", {
                method: "POST",
                headers: {
                    "Accept": "application/ld+json",
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify({
                    username: username(),
                    password: password(),
                }),
            });

            const result = await response.json();
            console.log(result);

            // Обработка результатов регистрации (например, перенаправление пользователя или вывод сообщения)
        } catch (error) {
            console.error("Ошибка при регистрации:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onInput={(e) => setUsername(e.target.value)} value={username()} />
            <input type="password" placeholder="Password"  autocomplete="new-password" onInput={(e) => setPassword(e.target.value)} value={password()} />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterForm;