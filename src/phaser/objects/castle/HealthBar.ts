import { CastleInterface } from "../../interfaces/Castle";
import { Point } from "../../interfaces/Point";

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
        const { width, height } = this.parentCastle.castleSprite.getSize();
        this.healthBarPosition = { x: x + width / 2, y: y + height / 2};
    }

    updateHealthBar(level: number, maxLevel: number) {
        const maxHealthHeight = 50; // Максимальная высота полосы здоровья
        const healthHeight = (level / maxLevel) * maxHealthHeight;
        const healthBarWidth = 10; // Ширина полосы здоровья

        this.graphics.clear(); // Очистка предыдущего состояния

        // Фон полосы здоровья
        this.graphics.fillStyle(0x000000);
        this.graphics.fillRect(this.healthBarPosition.x - healthBarWidth / 2, this.healthBarPosition.y - maxHealthHeight, healthBarWidth, maxHealthHeight);

        // Определяем цвет полосы здоровья в зависимости от уровня
        let healthColor;
        if(level > 60) {
            healthColor = 0x00ff00; // Green
        } else if(level > 30) {
            healthColor = 0xffaa00; // Yellow
        } else {
            healthColor = 0xff0000; // Red
        }

        // Рисуем актуальный уровень здоровья
        this.graphics.fillStyle(healthColor);
        this.graphics.fillRect(this.healthBarPosition.x - healthBarWidth / 2, this.healthBarPosition.y - healthHeight, healthBarWidth, healthHeight);

    }
}