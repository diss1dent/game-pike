import { OWNER } from "../config/constants";
import { CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import { EntityManager } from "./EntityManager";

export default class CastleManager extends EntityManager<CastleInterface> implements CastleManagerInterface{
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        super();
        this.scene = scene;
    }

    findClosestCastleWithOwners(castle: CastleInterface, owners: string[]) {
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

    getAllCastlesByOwner(owner: string): CastleInterface[] {
        return this.getAll().filter(castle => castle.owner === owner)
    }
}