// Shadow.js
export default class Shadow {
    scene: Phaser.Scene;
    shadow: Phaser.GameObjects.Graphics;
    x;
    y;
    width;
    depth;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, depth: number) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.depth = depth;
        this.shadow = this.createShadow();
        this.animateShadow();
    }

    createShadow() {
        const shadowOffsetX = 10; // Смещение тени по X
        const shadowOffsetY = 10; // Смещение тени по Y
        const shadowWidth = this.width * 0.5; // Ширина тени, относительно размера замка
        const shadowHeight = 10; // Высота тени
    
        const shadow = this.scene.add.graphics({ x: this.x + shadowOffsetX, y: this.y + shadowOffsetY });
        shadow.fillStyle(0x000000, 0.5); // Цвет тени и прозрачность
        shadow.fillEllipse(0, 0, shadowWidth, shadowHeight);
        shadow.setDepth(this.depth - 1); // Установка глубины тени ниже глубины замка

        return shadow
    }

    /**
     * This can be used in future
     */
    createSpriteShadow(scene: Phaser.Scene, x: number, y: number, depth: number) {
        const shadowOffsetX = 10; // Смещение тени по X относительно замка
        const shadowOffsetY = 10; // Смещение тени по Y относительно замка
    
        const shadowSprite = scene.add.sprite(x + shadowOffsetX, y + shadowOffsetY, 'shadowImageKey');
        shadowSprite.setScale(0.5); // Масштабирование тени, если необходимо
        shadowSprite.setDepth(depth - 1); // Установка глубины тени ниже глубины замка
        return shadowSprite
    }

    // createShadow() {
    //     const { x, y } = this.parent; // Позиция родительского объекта
    //     const shadowOffsetX = 10;
    //     const shadowOffsetY = 10;

    //     // Создаем графический объект или спрайт для тени
    //     this.shadow = this.scene.add.graphics({ x: x + shadowOffsetX, y: y + shadowOffsetY });
    //     this.shadow.fillStyle(0x000000, 0.5);
    //     this.shadow.fillEllipse(0, 0, 50, 15); // Пример размеров тени, настройте под свои нужды

    //     // Для спрайта использовали бы что-то вроде:
    //     // this.shadow = this.scene.add.sprite(x + shadowOffsetX, y + shadowOffsetY, 'shadowTexture');

    //     this.shadow.setDepth(-1); // Установка глубины тени ниже родительского объекта
    // }

    animateShadow() {
        // Добавляем анимацию движения тени
        this.scene.tweens.add({
            targets: this.shadow,
            x: `+=1`, // Смещение по оси X
            ease: 'Sine.easeInOut', // Тип анимации для плавного движения
            duration: 30, // Продолжительность анимации в миллисекундах
            yoyo: true, // Возврат анимации в исходное положение
            repeat: -1 // Бесконечное повторение анимации
        });
    }
}
