import RoadFactory from "../factories/RoadFactory";
import { OWNER } from "../config/constants";
import { gameDesign } from "../config/gameConfig";
import { CastleInterface } from "../interfaces/Castle";
import CastleManager from "../managers/CastleManager";
import RoadManager from "../managers/RoadManager";
import RoadHelper from '../helpers/RoadHelper'; //todo

export class RoadConstructionHandler {
    private scene: Phaser.Scene;
    private roadFactory: RoadFactory;
    private roadManager: RoadManager;
    private castleManager: CastleManager;
    private selectedCastle: CastleInterface | null = null;

    constructor(scene: Phaser.Scene, roadFactory: RoadFactory, roadManager: RoadManager, castleManager: CastleManager) {
        this.scene = scene;
        this.roadFactory = roadFactory;
        this.roadManager = roadManager;
        this.castleManager = castleManager;

        this.initMouseEvents();
    }

    private initMouseEvents() {
        this.scene.input.on('pointermove', this.handleMouseMove.bind(this));
        this.scene.input.on('pointerup', this.handleMouseUp.bind(this));

        this.scene.events.on('castle-selected', this.handleCastleSelected.bind(this));
    }

    private handleCastleSelected(castle: CastleInterface) {
        this.selectedCastle = castle;
        // Start road construction only if the selected castle belongs to the player
        if (this.selectedCastle && this.selectedCastle.owner === OWNER.player) {
            if (this.roadFactory.canBuildRoadFromCastle(this.selectedCastle)) {
                this.roadFactory.startRoad(this.selectedCastle.castleSprite.x, this.selectedCastle.castleSprite.y, OWNER.player);
            }            
        }
    }

    private handleMouseMove(pointer: Phaser.Input.Pointer) {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            // Update the road's end position to follow the mouse
            const startCastlePos = {
                x: this.selectedCastle.castleSprite.x,
                y: this.selectedCastle.castleSprite.y + this.selectedCastle.castleSprite.height * this.selectedCastle.castleSprite.scaleY / 2 - gameDesign.roadHeight / 2,
            };
            this.roadFactory.updateRoad(startCastlePos.x, startCastlePos.y, pointer.x, pointer.y);
        }
    }

    private handleMouseUp(pointer: Phaser.Input.Pointer) {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            // Attempt to finalize the road construction if the mouse is released over another castle
            let endCastle = this.castleManager.getAll().find(castle =>
                castle.castleSprite.getBounds().contains(pointer.x, pointer.y)
            );

            if (endCastle && endCastle !== this.selectedCastle) {
                if (this.castleManager.canRoadFitDistanceBetweenCastles(this.selectedCastle, endCastle)) {
                    this.roadManager.addRoadBetweenCastles(this.selectedCastle, endCastle, OWNER.player);
                }
            }

            this.roadFactory.destroyCurrentRoad();
            this.selectedCastle = null;
        }
    }
}
