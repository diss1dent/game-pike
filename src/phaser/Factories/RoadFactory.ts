import { CastleInterface } from '../interfaces/Castle';
import RoadManager from '../managers/RoadManager';
import Road from '../objects/Road';

export default class RoadFactory {
    private scene: Phaser.Scene;
    private manager: RoadManager;
    public currentRoad: Road | null;

    constructor(scene: Phaser.Scene, manager: RoadManager) {
        this.scene = scene;
        this.currentRoad = null;
        this.manager = manager;
    }

    // start building a new road
    startRoad(startX: number, startY: number, owner: string) {
        this.currentRoad = new Road(this.scene, owner);
    }

    // check if we can start building a new road
    canBuildRoadFromCastle(castle: CastleInterface): boolean {
        const connectedRoads = this.manager.getOutgoingRoadsFromCastle(castle).length;

        if (connectedRoads >= 3) return false; // Maximum roads reached
        if (connectedRoads === 2 && castle.level <= 60) return false; // Level too low for third road
        if (connectedRoads === 1 && castle.level <= 30) return false; // Level too low for second road
              
        return true;
    }

    canBuildRoadToCastle(castle: CastleInterface, targetCastle: CastleInterface): boolean {
        if (!this.canBuildRoadFromCastle(castle)) return false   
        if (this.manager.roadExists(castle, targetCastle)) return false

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
