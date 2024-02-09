import { OWNER } from "../config/constants";
import { CastleManagerInterface } from "../interfaces/Manager";
import { CastleInterface } from "../interfaces/Castle";
import RoadManager from "../managers/RoadManager";
import gameConfig from "../config/gameConfig";
import { RoadBetweenCastlesInterface } from "../interfaces/Road";
import EntityHelper from "../helpers/EntityHelper";

export default class CastleConquestHandler {
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
                // Проверяем, есть ли дороги, ведущие к замку
                const incomingRoads = this.roadManager.getIncomingRoadsToCastle(castle);
                const incomingEnemyRoads = incomingRoads.filter(testCastle => testCastle.owner !== castle.owner);
                const incomingOwnRoads = incomingRoads.filter(testCastle => testCastle.owner === castle.owner);

                // Если к замоку ведет дорога противника, его уровень начинает уменьшаться
                // Если к замоку ведет своя дорога, его уровень начинает увеличиваться
                if (incomingRoads.length > 0) {
                    const growthOrReductionSpeed = this.calculateGrowthOrReductionSpeed(incomingEnemyRoads, incomingOwnRoads);
                    castle.setLevel(castle.level + growthOrReductionSpeed);
                    if (castle.level <= 0) {
                        this.conquerCastle(castle, incomingEnemyRoads[0].owner);
                    }
                }
            
            });
            this.lastUpdateTime = time;
        }
    }

    incomingeEnemyRoads(targetCastle: CastleInterface): RoadBetweenCastlesInterface[] {
        return this.roadManager.getIncomingRoadsToCastle(targetCastle);//.filter(castle => castle.owner !== targetCastle.owner);
    }

    calculateGrowthOrReductionSpeed(incomingEnemyRoads: RoadBetweenCastlesInterface[], incomingOwnRoads: RoadBetweenCastlesInterface[]): number {
        let incomongPower = 0;
        incomingEnemyRoads.forEach(road => {
            incomongPower -= this.getSingleRoadStrength(road.startCastle);
        });
        incomingOwnRoads.forEach(road => {
            incomongPower += this.getSingleRoadStrength(road.startCastle);
        });
        
        return incomongPower;
    }

    getSingleRoadStrength(castle: CastleInterface): number {
        const castleRoads = this.roadManager.getOutgoingRoadsFromCastle(castle);

        return castle.strength / castleRoads.length;
    }

    conquerCastle(castle: CastleInterface, newOwner: string) {
        castle.owner = newOwner;
        this.roadManager.deleteOutgoingCastleRoads(castle);
        EntityHelper.updateTint(castle.castleSprite, castle.owner);

        if (this.castleManager.getAllCastlesByOwner(OWNER.computer).length <= 0) {
            this.scene.scene.start('VictoryScene'); 
        } else if (this.castleManager.getAllCastlesByOwner(OWNER.player).length <= 0) {
            this.scene.scene.start('GameOverScene'); 
        }
    }

}