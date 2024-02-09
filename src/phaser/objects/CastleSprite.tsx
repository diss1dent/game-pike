import { DEPTH, OWNER } from "../config/constants";
import EntityHelper from "../helpers/EntityHelper";
import { CastleInterface } from "../interfaces/Castle";

export default class CastleSprite extends Phaser.GameObjects.Sprite {
    //sprite: Phaser.GameObjects.Sprite;
    parent: CastleInterface;
    scaleX: number = 0.4;
    scaleY: number = 0.4;

    constructor(scene: Phaser.Scene, x: number, y: number, parent: CastleInterface) {
        super(scene, x, y, 'castle');
        this.parent = parent;

        this.initEvents();
        
        // Масштабирование спрайта
        this.setScale(this.scaleX, this.scaleY);
      
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
            this.setTint(0xB3E5FC); // изменение цвета
        });

        // Обработчик события: курсор убран с замка
        this.on('pointerout', () => {
            EntityHelper.updateTint(this, this.parent.owner);
        });

        this.on('pointerdown', () => {
            this.scene.events.emit('castle-selected', this.parent);
        });

    }

    getSize() {
        return {
            width: this.width * this.scaleX,
            height: this.height * this.scaleY
        }
    }

    startPlay() {
        //this.updateTint();
        EntityHelper.updateTint(this, this.parent.owner);
        this.anims.play('castle-stay');
    }
}