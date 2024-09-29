import RoadFactory from "../factories/RoadFactory";
import gameConfig, { gameDesign } from "../config/gameConfig";
import { CastleInterface } from "../interfaces/Castle";
import CastleManager from "../managers/CastleManager";
import RoadManager from "../managers/RoadManager";
import SocketManager from "../../app/api-socket/SocketManager";

export class RoadConstructionHandler {
    private scene: Phaser.Scene;
    private roadFactory: RoadFactory;
    private roadManager: RoadManager;
    private castleManager: CastleManager;
    private selectedCastle: CastleInterface | null = null;
    private socketManager: SocketManager;

    constructor(scene: Phaser.Scene, roadFactory: RoadFactory, roadManager: RoadManager, castleManager: CastleManager, socketManager: SocketManager) {
        this.scene = scene;
        this.roadFactory = roadFactory;
        this.roadManager = roadManager;
        this.castleManager = castleManager;
        this.socketManager = socketManager;

        this.initMouseEvents();

        this.socketManager.on('roadBuilt', (data) => {
            const startCastle = this.castleManager.getById(data.startCastleId);
            const endCastle = this.castleManager.getById(data.endCastleId);
            if (startCastle && endCastle) {
                this.roadManager.addRoadBetweenCastles(startCastle, endCastle, data.owner);
            }            
        });
    }

    private initMouseEvents() {
        this.scene.input.on('pointermove', this.handleMouseMove.bind(this));
        this.scene.input.on('pointerup', this.handleMouseUp.bind(this));

        this.scene.events.on('castle-selected', this.handleCastleSelected.bind(this));
    }

    private handleCastleSelected(castle: CastleInterface) {
        this.selectedCastle = castle;
        // Start road construction only if the selected castle belongs to the player
        if (this.selectedCastle && this.selectedCastle.owner === gameConfig.playerId) {
            if (this.roadFactory.canBuildRoadFromCastle(this.selectedCastle)) {
                this.roadFactory.startRoad(this.selectedCastle.castleSprite.x, this.selectedCastle.castleSprite.y, gameConfig.playerId);
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
                    //send buildRoad event to the server, that should emit roadBuilt from the server
                    this.socketManager.emit('buildRoad', {
                        startCastleId: this.selectedCastle.id,
                        endCastleId: endCastle.id,
                        owner: gameConfig.playerId,
                    });
                    //and then road will be created on the like that        
                    //this.roadManager.addRoadBetweenCastles(this.selectedCastle, endCastle, OWNER.player);
                }
            }

            this.roadFactory.destroyCurrentRoad();
            this.selectedCastle = null;
        }
    }
}
