import { DEPTH, OWNER } from "../../config/constants";
import EntityHelper from "../../helpers/EntityHelper";
import { CastleInterface } from "../../interfaces/Castle";
import Shadow from "./Shadow";

export default class CastleSprite extends Phaser.GameObjects.Sprite {
    //sprite: Phaser.GameObjects.Sprite;
    parent: CastleInterface;
    scaleX: number = 0.4;
    scaleY: number = 0.4;
    shadow!: Shadow;

    constructor(scene: Phaser.Scene, x: number, y: number, parent: CastleInterface) {
        super(scene, x, y, 'castle');
        this.parent = parent;

        // Масштабирование спрайта
        this.setScale(this.scaleX, this.scaleY);
        this.setDepth(DEPTH.castle);

        if (!this.scene.anims.exists('castle-stay')) {
            this.scene.anims.create({
                key: 'castle-stay',
                //frames: this.scene.anims.generateFrameNumbers('castle', { start:3, end: 4 }),
                frames: this.scene.anims.generateFrameNumbers('castle_sm4.1', { frames: [ 2, 3, 4 , 5, 6, 7] }),
                frameRate: 8,
                repeat: -1
            });
        }

        this.initEvents();        
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

    initShadow = () => {
        const size = this.getSize();        
        const xPos = this.x - 10; //(10 is the castle offset position in the image)
        const yPos = this.y + size.height / 2;

        this.shadow = new Shadow(this.scene, xPos, yPos, size.width + size.width / 2, DEPTH.castle);
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

        this.initShadow();
    }
}