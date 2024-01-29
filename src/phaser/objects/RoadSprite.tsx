import { DEPTH } from "../config/constants";

export default class RoadSprite extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'road'); // 'road' - ключ текстуры дороги
        
        // Создание анимации для дороги
        if (!this.scene.anims.exists('road-build')) {
            this.scene.anims.create({
                key: 'road-build',
                frames: this.scene.anims.generateFrameNumbers('road', { frames: [0, 1, 2] }),
                frameRate: 3,
                repeat: -1
            });
        }
        this.setVisible(true);
        this.anims.play('road-build');
        this.setDepth(DEPTH.road);
    }
    
}