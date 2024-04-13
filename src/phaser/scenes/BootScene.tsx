import Phaser from 'phaser';
import { parseJwt } from '../../app/api/helper';
import { setUserAuthenticated } from '../../store/store';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Здесь загружаем ассеты, необходимые для PreloadScene (например, изображения для загрузочного экрана)
        this.load.image('preloadBar', 'assets/images/preload-bar.png');
        //this.load.image('loading', 'assets/images/loading.gif');

    }

    create() {
        const loadingGif = document.getElementById('loadingGif');
        if (loadingGif !== null) {
            loadingGif.style.display = 'flex';
        }

        this.autentificateFromLocalStorage();
        this.scene.start('PreloadScene'); // Переход к PreloadScene после предварительной загрузки
    }

    autentificateFromLocalStorage = () => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const decodedToken = parseJwt(authToken);
            const userName = decodedToken.username;
            if (userName) {
                setUserAuthenticated(userName);
            }
        } 
    }
}

export default BootScene;