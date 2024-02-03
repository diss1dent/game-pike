import { OWNER } from "../config/constants";
import { CastleManagerInterface } from "../interfaces/Manager";
import { CastleInterface } from "../interfaces/Castle";
import RoadManager from "../managers/RoadManager";
import gameConfig from "../config/gameConfig";
import { RoadBetweenCastlesInterface } from "../interfaces/Road";

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
                // Проверяем, есть ли дороги, ведущие к замку от противника
                const incomingRoadsFromEnemy = this.incomingRoadsFromEnemy(castle);

                // Если замок нейтральный и к нему ведет дорога, его уровень начинает уменьшаться
                if (castle.owner === OWNER.neutral && incomingRoadsFromEnemy.length > 0) {
                    const reductionSpeed = this.calculateReductionSpeed(castle, incomingRoadsFromEnemy);
                    castle.updateLevel(castle.level - reductionSpeed);
                    if (castle.level <= 0) {
                        this.conquerCastle(castle, incomingRoadsFromEnemy[0].owner);
                    }
                }
                // Если замок принадлежит игроку или компьютеру, его уровень увеличивается, только если к нему нет вражеских дорог
                else if ((castle.owner === OWNER.player || castle.owner === OWNER.computer) && incomingRoadsFromEnemy.length === 0 && castle.level < gameConfig.castleMaxLevel) {
                    castle.updateLevel(castle.level + 1);
                }
            });
            this.lastUpdateTime = time;
        }
    }

    incomingRoadsFromEnemy(castle: CastleInterface): RoadBetweenCastlesInterface[] {
        return this.roadManager.getAllRoads().filter(road =>
            (road.endCastle === castle && road.startCastle.owner !== castle.owner) ||
            (road.startCastle === castle && road.endCastle.owner !== castle.owner)
        );
    }

    calculateReductionSpeed(castle: CastleInterface, incomingRoads: RoadBetweenCastlesInterface[]): number {
        let incomongPower = 0;
        incomingRoads.forEach(road => {
            incomongPower += this.getSingleRoadStrength(road.startCastle);
        });
        
        return incomongPower;
    }

    getSingleRoadStrength(castle: CastleInterface): number {
        const castleRoads = this.roadManager.getCastleRoads(castle);

        return castle.strength / castleRoads.length;
    }

    conquerCastle(castle: CastleInterface, newOwner: string) {
        castle.owner = newOwner;
        castle.castleSprite.updateTint();
    }

}