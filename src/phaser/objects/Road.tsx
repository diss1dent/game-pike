import { v4 as uuidv4 } from 'uuid';
import { DEPTH } from "../config/constants";
import { gameDesign } from "../config/gameConfig";
import { CastleInterface } from "../interfaces/Castle";
import { RoadInterface } from "../interfaces/Road";
import RoadSprite from "./RoadSprite";

export default class Road implements RoadInterface {    
    private id: string;
    private scene: Phaser.Scene;
    private segments: Phaser.GameObjects.Sprite[];
    public owner: string;
    public startCastle: CastleInterface | null;
    public endCastle: CastleInterface | null;
    
    constructor(scene: Phaser.Scene, owner: string, startCastle: CastleInterface | null = null, endCastle: CastleInterface | null = null) {
        this.id = uuidv4();
        this.scene = scene;
        this.segments = [];
        this.owner = owner;
        this.startCastle = startCastle;
        this.endCastle = endCastle;
    }
    
    public getId(): string {
        return this.id;
    }

    update(startX: number, startY: number, endX: number, endY: number) {
        // Удаляем предыдущие сегменты
        this.segments.forEach(segment => segment.destroy());
        this.segments = [];
    
        // Вычисляем угол и дистанцию
        const angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);
        const distance = Phaser.Math.Distance.Between(startX, startY, endX, endY);
        const numberOfSprites = Math.ceil(distance / gameDesign.roadWidth);
    
        // Определяем, где будет стрелка
        const arrowPosition = numberOfSprites < 10 ? Math.floor(numberOfSprites / 2) : 10; 
    
        for (let i = 0; i < numberOfSprites; i++) {
            const x = startX + gameDesign.roadWidth * i * Math.cos(angle);
            const y = startY + gameDesign.roadWidth * i * Math.sin(angle);
    
            if (i === arrowPosition || i > 0 && i % 10 === 0) {
                const arrowSprite = this.scene.add.sprite(x, y, 'road-arrow'); // 'road-arrow' - ключ текстуры стрелки
                arrowSprite.setRotation(angle); // Поворачиваем стрелку в направлении дороги
                arrowSprite.setScale(gameDesign.roadWidth / arrowSprite.width, gameDesign.roadHeight / arrowSprite.height);
                arrowSprite.setDepth(DEPTH.roadArrow);
                this.segments.push(arrowSprite);
            } else {
                const segment = new RoadSprite(this.scene, x, y, this);
                segment.setRotation(angle);
                this.segments.push(segment);
                this.scene.add.existing(segment);
            }
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
