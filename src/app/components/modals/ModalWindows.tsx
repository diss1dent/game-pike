import { store } from "./../../../store/store"; 
import LoginModal from "./login/LoginModal";

function ModalWindows() {
    
    return (
        <>
            {store.isLoginModalOpen && <LoginModal />}
        </>        
    );
}

export default ModalWindows;
