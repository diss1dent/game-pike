import { StoreSetter, createStore } from "solid-js/store";

const [store, setStore] = createStore({
    isLoginModalOpen: false,
    isAuthenticated: false, // Флаг аутентификации
    userName: "" // Имя пользователя
});

const setUserAuthenticated = (userName: StoreSetter<string, ["userName"]>) => {
    setStore("isAuthenticated", true);
    setStore("userName", userName);
};

const toggleLoginModal = () => {
    setStore("isLoginModalOpen", !store.isLoginModalOpen);
};

export { store, toggleLoginModal, setUserAuthenticated };