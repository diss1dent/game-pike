import Road from '../objects/Road';
import { Castle } from '../interfaces/Castle';

export default class RoadFactory {
    private scene: Phaser.Scene;
    public currentRoad: Road | null;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.currentRoad = null;
    }

    // Начало строительства дороги
    startRoad(startX: number, startY: number) {
        this.currentRoad = new Road(this.scene);
        this.currentRoad.addSegment(startX, startY);
    }

    // Обновление дороги
    updateRoad(currentX: number, currentY: number) {
        if (this.currentRoad) {
            // Здесь логика добавления новых сегментов дороги
            this.currentRoad.addSegment(currentX, currentY);
        }
    }

    // Завершение строительства дороги
    finishRoad(endCastle: Castle) {
        if (this.currentRoad) {
            // Здесь можно добавить логику для окончательной настройки дороги
            this.currentRoad = null;
        }
    }

    // Отмена строительства дороги
    cancelRoad() {
        if (this.currentRoad) {
            this.currentRoad.destroy();
            this.currentRoad = null;
        }
    }
}
