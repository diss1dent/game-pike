class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        // Показываем сообщение о завершении игры
        this.add.text(400, 300, 'Game Over', { color: '#f00' })
            .setOrigin(0.5, 0.5);

        // Добавляем кнопку для возврата в главное меню
        this.add.text(400, 350, 'Back to Menu', { color: '#0f0' })
            .setInteractive()
            .on('pointerdown', () => this.scene.start('MainMenuScene'));
    }
}

export default GameOverScene;
