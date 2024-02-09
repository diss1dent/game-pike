import { DEPTH, OWNER } from "../config/constants";
import { gameDesign } from "../config/gameConfig";
import EntityHelper from "../helpers/EntityHelper";
import { RoadInterface } from "../interfaces/Road";

export default class RoadSprite extends Phaser.GameObjects.Sprite {
    parent: RoadInterface;
    constructor(scene: Phaser.Scene, x: number, y: number, parent: RoadInterface) {
        super(scene, x, y, 'road'); // 'road' - ключ текстуры дороги
        this.parent = parent;
        // Создание анимации для дороги
        if (!this.scene.anims.exists('road-build')) {
            this.scene.anims.create({
                key: 'road-build',
                frames: this.scene.anims.generateFrameNumbers('road', { frames: [0, 1, 2] }),
                frameRate: 3,
                repeat: -1
            });
        }
        this.setScale(gameDesign.roadWidth / 25, gameDesign.roadHeight / 25);
        this.setVisible(true);
        this.anims.play('road-build');
        this.setDepth(DEPTH.road);
        EntityHelper.updateTint(this, this.parent.owner);
    }
}