import RoadSprite from "./RoadSprite";

export default class Road {
    private scene: Phaser.Scene;
    private segments: Phaser.GameObjects.Sprite[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.segments = [];
    }

    // Добавление сегмента дороги
    addSegment(x: number, y: number) {
        //const segment = this.scene.add.sprite(x, y, 'road');
        const segment = new RoadSprite(this.scene, x, y);
        segment.anims.play('road-build');
        this.segments.push(segment);

        console.log("new road", "x:" + x + "; y: " + y);
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
