import { createSignal, Show } from "solid-js";
import { onCleanup } from "solid-js";
import { toggleLoginModal } from "../../../../store/store";
import { phaserStore } from "../../../../store/phaserStore";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

export const enum LOGIN_TAB {
    login = 'login',
    register = 'register',
}

function LoginModal() {
    const [activeTab, setActiveTab] = createSignal(LOGIN_TAB.login); // 'login' или 'register'

    const handleTabButtonClick = (e: MouseEvent, activeTab: LOGIN_TAB) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab(activeTab);        
    }

    const closeModal = () => {
        toggleLoginModal()
    }

    onCleanup(() => {
        let currentScene = phaserStore.game?.scene.getScene('MainMenuScene');
        if (currentScene) {
           currentScene.input.enabled = true;
        }
    });

    return (
        <>
            <div class="modal" onClick={closeModal}>
                <div class="modal-content" onClick={(e) => {e.stopPropagation();}}>
                    <span class="close-button" onClick={closeModal}>&times;</span>
                    <div class="tabs">
                        <button onClick={(e) => {handleTabButtonClick(e, LOGIN_TAB.login)}} class={activeTab() === LOGIN_TAB.login ? 'active' : ''}>Login</button>
                        <button onClick={(e) => {handleTabButtonClick(e, LOGIN_TAB.register)}} class={activeTab() === LOGIN_TAB.register ? 'active' : ''}>Register</button>
                    </div>
                    <div class="tab-content">
                        <Show when={activeTab() === LOGIN_TAB.login}>
                            <LoginForm />
                        </Show>
                        <Show when={activeTab() === LOGIN_TAB.register}>
                            <RegisterForm />
                        </Show>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default LoginModal;
