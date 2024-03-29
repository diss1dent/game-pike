import TextButton from "../components/TextButton";

class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        // Установка фона сцены
        this.cameras.main.setBackgroundColor('#B2EBF2');

        // Добавляем заголовок "Game Over"
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'Game Over', {
            font: '40px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Добавляем кнопку для возврата в главное меню
        new TextButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2, 'Back to Menu', () => {
            this.scene.start('MainMenuScene');
        });
    }
}

export default GameOverScene;
