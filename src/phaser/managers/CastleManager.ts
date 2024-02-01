import { CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import { EntityManager } from "./EntityManager";

export default class CastleManager extends EntityManager<CastleInterface> implements CastleManagerInterface{
    scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        super();
        this.scene = scene;
    }

    //todo
    updateCastleLevels(): void {
        this.getAll().forEach(castle => {
            if (castle.owner === OWNER.neutral) {
                // Example logic: decrease level of neutral castles connected to a player's castle
            } else if (castle.owner === OWNER.player) {
                // Example logic: prevent growth of player's castles connected to neutral ones
            }
            // Implement the specific logic for updating castle levels here
        });
    }
}