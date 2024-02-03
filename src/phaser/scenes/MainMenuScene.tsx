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
        
        // Другие элементы меню (настройки, выход и т.д.)
    }

    createPlayButton() {
        

        // Размеры экрана
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        // Добавляем текстовую кнопку для начала игры
        new TextButton(this, centerX, centerY, 'Start', () => {
            this.scene.start('GameScene');
        });
    }

}

export default MainMenuScene;
