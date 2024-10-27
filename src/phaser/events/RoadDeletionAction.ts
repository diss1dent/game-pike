import { MouseAction } from './MouseActionManager';
import RoadManager from '../managers/RoadManager';
import CastleManager from '../managers/CastleManager';
import SocketManager from '../../app/api-socket/SocketManager';
import { RoadBetweenCastlesInterface } from '../interfaces/Road';

export default class RoadDeletionAction implements MouseAction {
    private scene: Phaser.Scene;
    private roadManager: RoadManager;
    private castleManager: CastleManager;
    private socketManager: SocketManager;
    private isDeletionMode: boolean;
    private highlightedRoad: RoadBetweenCastlesInterface | null = null;

    constructor(scene: Phaser.Scene, roadManager: RoadManager, castleManager: CastleManager, socketManager: SocketManager) {
        this.scene = scene;
        this.roadManager = roadManager;
        this.castleManager = castleManager;
        this.socketManager = socketManager;
        this.isDeletionMode = false;

        // Позиция кнопки с отступом
        const buttonX = this.scene.cameras.main.width - 150;
        const buttonY = 10;

        // Добавляем кнопку для активации режима удаления
        const deleteButton = this.scene.add.text(buttonX, buttonY, 'Delete Mode', { font: '16px Arial', fill: '#ff0000' })
            .setInteractive()
            .setScrollFactor(0) // Оставляем кнопку на месте при перемещении камеры
            .setDepth(1000) // Устанавливаем высокий z-index, чтобы кнопка была видна поверх других объектов
            .on('pointerdown', () => this.toggleDeletionMode());

        // Подписываемся на событие удаления дороги с сервера
        this.socketManager.on('roadDeleted', (data) => {
            const road = this.roadManager.getRoadById(data.roadId);
            if (road) {
                this.roadManager.deleteRoad(road);
            }
        });
    }

    // Присваиваем высокий приоритет для удаления дорог
    priority = 10;

    // Режим активен только если включен режим удаления дорог
    isActive() {
        return this.isDeletionMode;
    }

    toggleDeletionMode() {
        this.isDeletionMode = !this.isDeletionMode;
        console.log('Deletion mode:', this.isDeletionMode ? 'ON' : 'OFF');
    }

    onPointerDown(pointer: Phaser.Input.Pointer) {
        if (!this.isDeletionMode) return;

        const point = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
        const road = this.findRoadAtPoint(point);
        if (road) {
            this.deleteRoad(road);
            this.socketManager.emit('deleteRoad', { roadId: road.getId() });
        }
    }

    onPointerMove(pointer: Phaser.Input.Pointer) {
        if (!this.isDeletionMode) return;

        const point = new Phaser.Math.Vector2(pointer.worldX, pointer.worldY);
        const road = this.findRoadAtPoint(point);

        if (road && road !== this.highlightedRoad) {
            // Подсвечиваем дорогу, если она не совпадает с текущей подсвеченной
            this.highlightRoad(road);
        } else if (!road && this.highlightedRoad) {
            // Убираем подсветку, если мышь не находится над дорогой
            this.clearHighlightedRoad();
        }
    }

    onPointerUp(pointer: Phaser.Input.Pointer) {
        // Не нужно никаких действий на PointerUp для удаления дорог
    }

    // Ищем дорогу на основе точки, где находится курсор
    private findRoadAtPoint(point: Phaser.Math.Vector2): RoadBetweenCastlesInterface | null {
        for (let road of this.roadManager.getAllRoads()) {
            const startPoint = this.roadManager.getConnectionPoint(road.startCastle);
            const endPoint = this.roadManager.getConnectionPoint(road.endCastle);
            const roadLine = new Phaser.Geom.Line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);

            if (Phaser.Geom.Intersects.PointToLine(point, roadLine)) {
                return road;
            }
        }
        return null;
    }

    // Подсвечиваем дорогу
    private highlightRoad(road: RoadBetweenCastlesInterface) {
        this.clearHighlightedRoad(); // Убираем предыдущую подсвеченную дорогу
        this.highlightedRoad = road;
        this.roadManager.highlightRoad(road); // Метод для изменения внешнего вида дороги (например, изменение цвета)
    }

    // Убираем подсветку с дороги
    private clearHighlightedRoad() {
        if (this.highlightedRoad) {
            this.roadManager.clearHighlight(this.highlightedRoad); // Возвращаем дорогу в исходное состояние
            this.highlightedRoad = null;
        }
    }

    // Удаляем дорогу
    private deleteRoad(road: RoadBetweenCastlesInterface) {
        this.roadManager.deleteRoad(road);
    }
}
