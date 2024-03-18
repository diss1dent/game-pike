import { toggleLoginModal } from "../../store/store";
import TextButton from "../components/TextButton";
import Background from "../objects/Background";

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        // Установка фона
        Background.setFullScreen(this, 'background');
        
        this.createPlayButton();
        this.createLoginButton();
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

    createLoginButton() {
        const loginButtonX = this.scale.width / 2;
        const loginButtonY = this.scale.height / 2 + 100; // Размещаем ниже кнопки начала игры

        new TextButton(this, loginButtonX, loginButtonY, 'Login', () => {
            this.input.enabled = false;
            toggleLoginModal()
        });
    }}

export default MainMenuScene;
