import { DEPTH } from "../config/constants";

export default class Castle extends Phaser.GameObjects.Sprite {
    //sprite: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'castle');

        this.initEvents();
        
        // Масштабирование спрайта
        this.setScale(0.4, 0.4);
      
        // Создание анимации для дороги
        if (!this.scene.anims.exists('castle-stay')) {
            this.scene.anims.create({
                key: 'castle-stay',
                //frames: this.scene.anims.generateFrameNumbers('castle', { start:3, end: 4 }),
                frames: this.scene.anims.generateFrameNumbers('castle_sm4.1', { frames: [ 2, 3, 4 , 5, 6, 7] }),
                frameRate: 8,
                repeat: -1
            });
        }

        this.setDepth(DEPTH.castle);
    }

    initEvents() {
        // Делаем спрайт интерактивным
        this.setInteractive();

        // Обработчик события: курсор наведен на замок
        this.on('pointerover', () => {
            this.setTint(0xB3E5FC); // Например, изменение цвета
            this.setTint(0xBDBDBD); // Например, изменение цвета
        });

        // Обработчик события: курсор убран с замка
        this.on('pointerout', () => {
            this.clearTint(); // Убрать изменения
        });

        this.on('pointerdown', () => {
            this.scene.events.emit('castle-selected', this);
        });

    }

    startPlay() {
        // Воспроизведение анимации 'castle-stay'
        this.anims.play('castle-stay');
    }

}