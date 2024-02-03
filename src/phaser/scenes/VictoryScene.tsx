import TextButton from "../components/TextButton";

class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }

    create() {
        // Установка фона сцены
        this.cameras.main.setBackgroundColor('#B2EBF2');

        // Добавляем заголовок "Game Over"
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'YOU WIN :)', {
            font: '40px Arial',
            fill: '#ffffff'
        }).setOrigin(0.5);

        // Добавляем кнопку для возврата в главное меню
        new TextButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2, 'Back to Menu', () => {
            this.scene.start('MainMenuScene');
        });
    }
}

export default VictoryScene;
