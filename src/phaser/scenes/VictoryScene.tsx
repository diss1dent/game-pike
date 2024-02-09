import TextButton from "../components/TextButton";
import Background from "../objects/Background";

class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }

    preload() {
        // Загрузка изображения спрайта
        this.load.image('trophy', 'assets/images/trophy.png');
    }

    create() {
        // Установка фона сцены
        this.cameras.main.setBackgroundColor('#B2EBF2');
        Background.setFullScreen(this, 'background');

        // Добавляем заголовок "Game Over"
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 + 220, 'CONGRATULATIONS YOU WIN :)', {
            font: '40px Play',
            fill: '#2790c7'
        }).setOrigin(0.5);

        // Добавляем кнопку для возврата в главное меню
        new TextButton(this, this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'Back to Menu', () => {
            this.scene.start('MainMenuScene');
        });

        // Создаем спрайт по центру экрана
        let trophy = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2 - 300, 'trophy');
        trophy.setScale(0.4, 0.4);

        // Добавляем анимацию вращения
        this.tweens.add({
            targets: trophy,
            angle: '-=25', // Вращение на 45 градусов влево от начального положения
            ease: 'Sine.easeInOut', // Тип анимации для плавного движения
            duration: 1000, // Продолжительность анимации в миллисекундах
            yoyo: true, // Позволяет анимации вернуться к начальному состоянию
            repeat: -1, // Бесконечное повторение
            hold: 50, // Задержка в миллисекундах перед началом обратного движения
        });
    }
}

export default VictoryScene;
