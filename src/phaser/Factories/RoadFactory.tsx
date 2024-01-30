import Road from '../objects/Road';

export default class RoadFactory {
    private scene: Phaser.Scene;
    public currentRoad: Road | null;
    public roadWidth: number;
    public roadHeight: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.currentRoad = null;
        this.roadWidth = 25;
        this.roadHeight = 25;
    }

    // Начало строительства дороги
    startRoad(startX: number, startY: number, owner: string) {
        this.currentRoad = new Road(this.scene, this.roadWidth, owner);
    }

    // Обновление дороги
    updateRoad(fromX: number, fromY: number, currentX: number, currentY: number) {
        if (this.currentRoad) {
            this.currentRoad.update(fromX, fromY, currentX, currentY);
        }
    }

    destroyCurrentRoad() {
        if (this.currentRoad) {
            this.currentRoad.destroy();
            this.currentRoad = null;
        }
    }
}
