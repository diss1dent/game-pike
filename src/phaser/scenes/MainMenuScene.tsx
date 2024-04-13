import { parseJwt } from "../../app/api/helper";
import SocketManager from "../../app/api-socket/SocketManager";
import { store, toggleLoginModal } from "../../store/store";
import TextButton from "../components/TextButton";
import Background from "../objects/Background";
import { config } from "../../config";

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        // Установка фона
        Background.setFullScreen(this, 'background');
        
        this.createPlayButton();
        this.createGameButton();

        if (!store.isAuthenticated) { // Проверяем, не авторизован ли уже пользователь
            this.createLoginButton();
        } else {
            this.displayUsername();
        }
    }

    createPlayButton() {       
        // Размеры экрана
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Добавляем текстовую кнопку для начала игры
        new TextButton(this, centerX, centerY, 'Start', () => {
            this.scene.start('GameScene');
            //this.scene.start('VictoryScene');
        });
    }

    createGameButton() {
        const socketManager = new SocketManager();
        socketManager.connect(config.apiSocketURL);
        socketManager.sendMessage("222222");

        const loginButtonX = this.scale.width / 2;
        const loginButtonY = this.scale.height / 2 + 200; // Размещаем ниже кнопки начала игры

        new TextButton(this, loginButtonX, loginButtonY, 'Find new game', () => {
            this.input.enabled = false;
            socketManager.sendMessage("4444");
        });
    }

    createLoginButton() {
        const loginButtonX = this.scale.width / 2;
        const loginButtonY = this.scale.height / 2 + 100; // Размещаем ниже кнопки начала игры

        new TextButton(this, loginButtonX, loginButtonY, 'Login', () => {
            this.input.enabled = false;
            toggleLoginModal()
        });
    }

    displayUsername() {
        const userNameX = this.scale.width / 2;
        const userNameY = this.scale.height / 2 + 100;
        this.add.text(userNameX, userNameY, `Welcome, ${store.userName}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
    }
}

export default MainMenuScene;
