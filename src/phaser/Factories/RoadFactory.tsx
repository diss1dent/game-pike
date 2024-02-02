import { CastleInterface } from '../interfaces/Castle';
import RoadManager from '../managers/RoadManager';
import Road from '../objects/Road';

export default class RoadFactory {
    private scene: Phaser.Scene;
    private manager: RoadManager;
    public currentRoad: Road | null;
    public roadWidth: number;
    public roadHeight: number;

    constructor(scene: Phaser.Scene, manager: RoadManager) {
        this.scene = scene;
        this.currentRoad = null;
        this.roadWidth = 25;
        this.roadHeight = 25;
        this.manager = manager;
    }

    // start building a new road
    startRoad(startX: number, startY: number, owner: string) {
        this.currentRoad = new Road(this.scene, this.roadWidth, owner);
    }

    // check if we can start building a new road
    canBuildRoad(castle: CastleInterface): boolean {
        const connectedRoads = this.manager.getAllRoads().filter(road => 
            road.startCastle === castle || road.endCastle === castle
        ).length;

        if (connectedRoads >= 3) return false; // Maximum roads reached
        if (connectedRoads === 2 && castle.level <= 60) return false; // Level too low for third road
        if (connectedRoads === 1 && castle.level <= 30) return false; // Level too low for second road

        return true;
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
