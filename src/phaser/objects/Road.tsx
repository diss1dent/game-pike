import RoadSprite from "./RoadSprite";

export default class Road {
    private scene: Phaser.Scene;
    private segments: Phaser.GameObjects.Sprite[];
    public roadWidth: number;

    constructor(scene: Phaser.Scene, roadWidth: number) {
        this.scene = scene;
        this.segments = [];
        this.roadWidth = roadWidth; // Ширина одного сегмента дороги
    }

    // Добавление сегмента дороги
    // addSegment(x: number, y: number) {
    //     //const segment = this.scene.add.sprite(x, y, 'road');
    //     const segment = new RoadSprite(this.scene, x, y);
    //     segment.anims.play('road-build');
    //     this.segments.push(segment);
    //     this.scene.add.existing(segment);
    //     //console.log("new road", "x:" + x + "; y: " + y);
    // }

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

    // Другие методы по необходимости...
}
