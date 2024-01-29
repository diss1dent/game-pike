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
                frames: this.scene.anims.generateFrameNumbers('castle_sm', { frames: [ 4, 5, 6,] }),
                frameRate: 8,
                repeat: -1
            });
        }
    }

    initEvents() {
        // Делаем спрайт интерактивным
        this.setInteractive();

        // Обработчик события: курсор наведен на замок
        this.on('pointerover', () => {
            this.setTint(0xAAAAAA); // Например, изменение цвета
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