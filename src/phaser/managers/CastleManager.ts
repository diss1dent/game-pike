import { OWNER } from "../config/constants";
import GeometryHelper from "../helpers/GeometryHelper";
import RoadHelper from "../helpers/RoadHelper";
import { CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import { PointInterface } from "../interfaces/PointInterface";
import { EntityManager } from "./EntityManager";

export default class CastleManager extends EntityManager<CastleInterface> implements CastleManagerInterface{
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        super();
        this.scene = scene;
    }

    findClosestCastleWithOwners(castle: CastleInterface, owners: OWNER[]) {
        // Identify neutral castles that can be targeted for capture
        const potentialTargets = this.getAll().filter(target => 
            owners.includes(target.owner) && target !== castle
        );

        let closestCastle = null;
        let minDistance = Infinity;

        potentialTargets.forEach(target => {
            const distance = Phaser.Math.Distance.Between(
                castle.castleSprite.x, castle.castleSprite.y,
                target.castleSprite.x, target.castleSprite.y
            );

            if (distance < minDistance) {
                minDistance = distance;
                closestCastle = target;
            }
        });
        
        return closestCastle;
    }

    //todo
    // updateCastleLevels(): void {
    //     this.getAll().forEach(castle => {
    //         if (castle.owner === OWNER.neutral) {
    //             // Example logic: decrease level of neutral castles connected to a player's castle
    //         } else if (castle.owner === OWNER.player) {
    //             // Example logic: prevent growth of player's castles connected to neutral ones
    //         }
    //         // Implement the specific logic for updating castle levels here
    //     });
    // }

    getAllCastlesByOwner(owner: OWNER): CastleInterface[] {
        return this.getAll().filter(castle => castle.owner === owner)
    }

    /**
     * Находит замки внутри заданной зоны влияния.
     * @param {Phaser.Geom.Polygon} zone - Полигон зоны влияния.
     * @returns {CastleInterface[]} Список замков внутри зоны.
     */
    findCastlesInZone(zone: Phaser.Geom.Polygon): CastleInterface[] {
        const castlesInZone = this.getAll().filter(castle => {
            const castlePos = { x: castle.castleSprite.x, y: castle.castleSprite.y };
            return Phaser.Geom.Polygon.Contains(zone, castlePos.x, castlePos.y);
        });

        return castlesInZone;
    }

    /**
     * Allow to build road only up to 2 castles away
     */
    canRoadFitDistanceBetweenCastles(fromCastle: CastleInterface, toCastle: CastleInterface): boolean {
        const zone = GeometryHelper.getInfluenceZone(
            RoadHelper.getConnectionPoint(fromCastle),
            RoadHelper.getConnectionPoint(toCastle),
            1000
        );
        const castlesBetween = this.findCastlesInZone(zone);
        console.log('castlesBetween', castlesBetween)
        
        if (castlesBetween.length <= 3) {
            return true
        }

        return false;
    }
}