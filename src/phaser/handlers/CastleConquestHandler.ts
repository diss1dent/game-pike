import { OWNER } from "../config/constants";
import RoadManager from "../managers/RoadManager";
import { CastleManagerInterface } from "../interfaces/Manager";
import { CastleInterface } from "../interfaces/Castle";
import gameConfig from "../config/gameConfig";

export class CastleConquestHandler {
    scene: any;
    castleManager: any;
    roadManager: RoadManager;
    lastUpdateTime: number;
    constructor(scene: Phaser.Scene, castleManager: CastleManagerInterface, roadManager: RoadManager) {
        this.scene = scene;
        this.castleManager = castleManager;
        this.roadManager = roadManager;
        this.lastUpdateTime = 0;
    }

    update(time: number) {
        if (time - this.lastUpdateTime > gameConfig.castleGrowthTime) { // Every second
            this.castleManager.getAll().forEach((castle: CastleInterface) => {
                // Decrease level for neutral castles connected to a player or computer
                if (castle.owner === OWNER.neutral && this.isConnectedToAnyCastle(castle) && castle.level > 0) {
                    castle.updateLevel(castle.level - 1);
                    // Check if the castle should be conquered
                    if (castle.level === 0) {
                        this.conquerCastle(castle);
                    }
                } else if ((castle.owner === OWNER.player || castle.owner === OWNER.computer) && castle.level < gameConfig.castleMaxLevel) {
                    // Increase level of player's or computer's castle if not connected to neutral
                    if (!this.isConnectedToNeutralCastle(castle)) {
                        castle.updateLevel(castle.level + 1);
                    }
                }
            });
            this.lastUpdateTime = time;
        }
    }

    isConnectedToAnyCastle(castle: CastleInterface) {
        return this.roadManager.getAllRoads().some(road => 
            road.startCastle === castle || road.endCastle === castle
        );
    }

    conquerCastle(castle: CastleInterface) {
        // Determine new owner based on connected roads
        const connectedRoad = this.roadManager.getAllRoads().find(road => 
            road.endCastle === castle || road.startCastle === castle
        );
        if (connectedRoad) {
            castle.owner = connectedRoad.owner; // Conquer castle
        }
    }

    isConnectedToPlayerCastle(neutralCastle: CastleInterface) {
        return this.roadManager.getAllRoads().some(road => 
            road.owner === OWNER.player && (road.startCastle === neutralCastle || road.endCastle === neutralCastle)
        );
    }

    isConnectedToNeutralCastle(playerCastle: CastleInterface) {
        return this.roadManager.getAllRoads().some(road => 
            road.owner === OWNER.player && (road.startCastle.owner === OWNER.neutral || road.endCastle.owner === OWNER.neutral)
        );
    }
}

export default CastleConquestHandler;