import { createStore } from "solid-js/store";

const [store, setStore] = createStore({
    isLoginModalOpen: false
});

const toggleLoginModal = () => {
    console.log("Before toggle:", store.isLoginModalOpen);
    setStore("isLoginModalOpen", !store.isLoginModalOpen);
    console.log("After toggle:", store.isLoginModalOpen);
};

export { store, toggleLoginModal };