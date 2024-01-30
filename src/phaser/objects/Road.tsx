import { CastleInterface } from "../interfaces/Castle";
import { RoadInterface } from "../interfaces/Road";
import RoadSprite from "./RoadSprite";

export default class Road implements RoadInterface {
    private scene: Phaser.Scene;
    private segments: Phaser.GameObjects.Sprite[];
    public roadWidth: number;
    public owner: string;
    public startCastle: CastleInterface | null;
    public endCastle: CastleInterface | null;
    
    constructor(scene: Phaser.Scene, roadWidth: number, owner: string, startCastle: CastleInterface | null = null, endCastle: CastleInterface | null = null) {
        this.scene = scene;
        this.segments = [];
        this.roadWidth = roadWidth; // Ширина одного сегмента дороги
        this.owner = owner;
        this.startCastle = startCastle;
        this.endCastle = endCastle;
    }

    update(startX: number, startY: number, endX: number, endY: number) {
        // Удаляем предыдущие сегменты
        this.segments.forEach(segment => segment.destroy());
        this.segments = [];

        // Вычисляем угол и дистанцию
        const angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);
        const distance = Phaser.Math.Distance.Between(startX, startY, endX, endY);
        const numberOfSprites = Math.ceil(distance / this.roadWidth);

        for (let i = 0; i < numberOfSprites; i++) {
            const x = startX + this.roadWidth * i * Math.cos(angle);
            const y = startY + this.roadWidth * i * Math.sin(angle);

            const segment = new RoadSprite(this.scene, x, y);
            segment.setRotation(angle);
            this.segments.push(segment);
            this.scene.add.existing(segment);
        }
    }

    // Получение всех сегментов
    getSegments(): Phaser.GameObjects.Sprite[] {
        return this.segments;
    }

    // Удаление всех сегментов дороги
    destroy() {
        this.segments.forEach(segment => segment.destroy());
        this.segments = [];
    }
}
