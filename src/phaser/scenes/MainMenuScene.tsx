import { buttonStyle } from "../config/phaserUI";
import Background from "../objects/Background";

class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    create() {
        // Установка фона
        Background.setFullScreen(this, 'background');
        
        this.createPlayButton();
        
        // Другие элементы меню (настройки, выход и т.д.)
    }

    createPlayButton() {
        

        // Размеры экрана
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Добавляем текстовую кнопку для начала игры
        let playButton = this.add.text(centerX, centerY, 'Play', buttonStyle)
            .setShadow(5, 5, 'rgba(0,0,0,0.5)', 15)
            .setInteractive()
            .setOrigin(0.5) // Центрирование текста относительно координат кнопки
            .on('pointerdown', () => this.scene.start('GameScene')); // Переход к GameScene при нажатии


        void playButton;
    }

}

export default MainMenuScene;
