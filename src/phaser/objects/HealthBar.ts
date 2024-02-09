import { CastleInterface } from "../interfaces/Castle";
import { Point } from "../interfaces/Point";

export default class HealthBar {
    scene: Phaser.Scene;
    parentCastle: CastleInterface;
    graphics: Phaser.GameObjects.Graphics;
    healthBarPosition!: Point

    constructor(scene: Phaser.Scene, parentCastle: CastleInterface) {
        this.scene = scene;
        this.parentCastle = parentCastle;
        this.graphics = this.scene.add.graphics();
        this.createHealthBar();
    }

    createHealthBar() {
        const { x, y } = this.parentCastle.castleSprite;
        const { width } = this.parentCastle.castleSprite.getSize();
        this.healthBarPosition = { x: x - width / 2, y: y - width }; // Регулируйте положение полосы здоровья по необходимости
    }

    updateHealthBar(level: number, maxLevel: number) {
        const maxHealthHeight = 50; // Максимальная высота полосы здоровья
        const healthHeight = (level / maxLevel) * maxHealthHeight;
        const healthBarWidth = 10; // Ширина полосы здоровья

        this.graphics.clear(); // Очистка предыдущего состояния

        // Рисуем фон полосы здоровья
        this.graphics.fillStyle(0x000000);
        this.graphics.fillRect(this.healthBarPosition.x, this.healthBarPosition.y - maxHealthHeight, healthBarWidth, maxHealthHeight);

        // Рисуем актуальный уровень здоровья
        this.graphics.fillStyle(0x00ff00); // Используйте зеленый для здоровья
        this.graphics.fillRect(this.healthBarPosition.x, this.healthBarPosition.y - healthHeight, healthBarWidth, healthHeight);
    }
}