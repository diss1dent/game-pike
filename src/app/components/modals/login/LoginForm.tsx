import { createSignal } from "solid-js";
import { authRequest } from "../../../api/request";
import { setUserAuthenticated, toggleLoginModal } from "../../../../store/store";

function LoginForm() {
    const [name, setName] = createSignal("");
    const [password, setPassword] = createSignal("");

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const token = await authRequest(name(), password());
        if (token) {
            toggleLoginModal();
            setUserAuthenticated(name()); 
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
