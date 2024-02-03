import { OWNER } from "../config/constants";
import { CastleManagerInterface } from "../interfaces/Manager";
import { CastleInterface } from "../interfaces/Castle";
import RoadManager from "../managers/RoadManager";
import gameConfig from "../config/gameConfig";
import { RoadBetweenCastlesInterface } from "../interfaces/Road";

export default class CastleGrowthHandler {
    scene: Phaser.Scene;
    castleManager: CastleManagerInterface;
    roadManager: RoadManager;
    lastUpdateTime: number;

    constructor(scene: Phaser.Scene, castleManager: CastleManagerInterface, roadManager: RoadManager) {
        this.scene = scene;
        this.castleManager = castleManager;
        this.roadManager = roadManager;
        this.lastUpdateTime = 0;
    }

    update(time: number) {
        if (time - this.lastUpdateTime > gameConfig.castleGrowthTime) {
            this.castleManager.getAll().forEach((castle: CastleInterface) => {        
                const outgoingRoads = this.roadManager.getOutgoingRoadsFromCastle(castle);        
                // Если замок принадлежит игроку или компьютеру, его уровень увеличивается, только если к нему нет вражеских дорог
                if ((castle.owner === OWNER.player || castle.owner === OWNER.computer)) {
                    const defaultGrowthRate = this.calculateDefaultGrowthRate(outgoingRoads);
                    castle.setLevel(castle.level + defaultGrowthRate);
                }
            });
            this.lastUpdateTime = time;
        }
    }

    calculateDefaultGrowthRate(outgoingRoads: RoadBetweenCastlesInterface[]): number {       
        return outgoingRoads.length > 0 ? 0 : 1;
    }

}