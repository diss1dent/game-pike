import { UNIT_TYPES } from "../config/constants";
import { CastleManagerInterface } from "../interfaces/Manager";
import { CastleInterface } from "../interfaces/Castle";
import RoadManager from "../managers/RoadManager";
import gameConfig from "../config/gameConfig";
import UnitsFactory from "../factories/UnitsFactory";

export default class SpawnUnitsHandler {
    scene: Phaser.Scene;
    castleManager: CastleManagerInterface;
    roadManager: RoadManager;
    lastUpdateTime: number;
    unitsFactory: UnitsFactory;

    constructor(scene: Phaser.Scene, castleManager: CastleManagerInterface, roadManager: RoadManager, unitsFactory: UnitsFactory) {
        this.scene = scene;
        this.castleManager = castleManager;
        this.roadManager = roadManager;
        this.unitsFactory = unitsFactory
        this.lastUpdateTime = 0;
    }

    update(time: number) {
        if (time - this.lastUpdateTime > gameConfig.castleGrowthTime) {
            this.castleManager.getAll().forEach((castle: CastleInterface) => {
                const outgoingRoads = this.roadManager.getOutgoingRoadsFromCastle(castle);

                if (outgoingRoads.length > 0) {
                    for (const outgoingRoad of outgoingRoads) {
                        this.unitsFactory.spawnUnitsForAttack(outgoingRoad.startCastle, outgoingRoad.endCastle);
                    }
                }
            
            });
            this.lastUpdateTime = time;
        }
    }

    
}