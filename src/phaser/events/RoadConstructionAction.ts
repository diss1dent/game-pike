// RoadConstructionAction.ts
import { MouseAction } from './MouseActionManager';
import RoadFactory from '../factories/RoadFactory';
import RoadManager from '../managers/RoadManager';
import CastleManager from '../managers/CastleManager';
import SocketManager from '../../app/api-socket/SocketManager';
import { CastleInterface } from '../interfaces/Castle';
import gameConfig, { gameDesign } from '../config/gameConfig';

export default class RoadConstructionAction implements MouseAction {
    private scene: Phaser.Scene;
    private roadFactory: RoadFactory;
    private roadManager: RoadManager;
    private castleManager: CastleManager;
    private selectedCastle: CastleInterface | null = null;
    private socketManager: SocketManager;

    constructor(
        scene: Phaser.Scene,
        roadFactory: RoadFactory,
        roadManager: RoadManager,
        castleManager: CastleManager,
        socketManager: SocketManager
    ) {
        this.scene = scene;
        this.roadFactory = roadFactory;
        this.roadManager = roadManager;
        this.castleManager = castleManager;
        this.socketManager = socketManager;

        this.initSocketEvents();
        this.initSceneEvents();
    }

    // Задаем высокий приоритет для строительства дорог
    priority = 10;

    // Проверяем активность: если замок выбран, то действие активно
    isActive() {
        return this.selectedCastle !== null;
    }

    // Инициализация событий на сервере для синхронизации
    private initSocketEvents() {
        this.socketManager.on('roadBuilt', (data) => {
            const startCastle = this.castleManager.getById(data.startCastleId);
            const endCastle = this.castleManager.getById(data.endCastleId);
            if (startCastle && endCastle) {
                this.roadManager.addRoadBetweenCastles(startCastle, endCastle, data.owner);
            }
        });
    }

    // Инициализация событий выбора замков в сцене
    private initSceneEvents() {
        this.scene.events.on('castle-selected', this.handleCastleSelected.bind(this));
    }

    // Когда выбран замок, начинаем строительство дороги
    private handleCastleSelected(castle: CastleInterface) {
        this.selectedCastle = castle;
        if (this.selectedCastle && this.selectedCastle.owner === gameConfig.playerId) {
            if (this.roadFactory.canBuildRoadFromCastle(this.selectedCastle)) {
                this.roadFactory.startRoad(this.selectedCastle.castleSprite.x, this.selectedCastle.castleSprite.y, gameConfig.playerId);
            }
        }
    }

    // Обработка события pointerdown: ничего не нужно делать для начала постройки
    onPointerDown(pointer: Phaser.Input.Pointer) {
        // Начало строительства начинается при выборе замка, так что здесь ничего не нужно
    }

    // Обработка события pointermove: обновляем текущую дорогу, если она строится
    onPointerMove(pointer: Phaser.Input.Pointer) {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            // Учитываем позицию камеры для расчета правильных координат
            const worldX = pointer.worldX || this.scene.cameras.main.scrollX + pointer.x;
            const worldY = pointer.worldY || this.scene.cameras.main.scrollY + pointer.y;

            const startCastlePos = {
                x: this.selectedCastle.castleSprite.x,
                y: this.selectedCastle.castleSprite.y + this.selectedCastle.castleSprite.height * this.selectedCastle.castleSprite.scaleY / 2 - gameDesign.roadHeight / 2,
            };
            this.roadFactory.updateRoad(startCastlePos.x, startCastlePos.y, worldX, worldY);
        }
    }

    // Обработка события pointerup: завершаем строительство дороги при отпускании мыши
    onPointerUp(pointer: Phaser.Input.Pointer) {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            debugger;
            const endCastle = this.castleManager.getAll().find(castle =>
                castle.castleSprite.getBounds().contains(pointer.worldX, pointer.worldY)
            );

            if (endCastle && endCastle !== this.selectedCastle) {
                if (this.castleManager.canRoadFitDistanceBetweenCastles(this.selectedCastle, endCastle)) {
                    this.socketManager.emit('buildRoad', {
                        startCastleId: this.selectedCastle.id,
                        endCastleId: endCastle.id,
                        owner: gameConfig.playerId,
                    });
                }
            }

            // Очищаем текущую дорогу и сбрасываем выбранный замок
            this.roadFactory.destroyCurrentRoad();
            this.selectedCastle = null;
        } else {
            this.selectedCastle = null;
        }
    }
}
