import Road from '../objects/Road';
import { Castle } from '../interfaces/Castle';

export default class RoadManager {
    private scene: Phaser.Scene;
    private roads: Road[];
    private roadWidth: number;
    private roadHeight: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.roads = [];
        this.roadWidth = 25;
        this.roadHeight = 25;
    }

    // Добавление новой дороги
    addRoad(road: Road) {
        this.roads.push(road);
    }

    // Фиксация дороги
    addRoadBetweenCastles(startCastle: Castle, endCastle: Castle) {
        // Здесь логика для окончательной настройки и фиксации дороги
        const road = new Road(this.scene, this.roadWidth);
        const startCastleCastelFooterPosY = startCastle.y + startCastle.height * endCastle.scaleY / 2 - this.roadHeight / 2;
        const endCastleCastelFooterPosY = endCastle.y + endCastle.height * endCastle.scaleY / 2 - this.roadHeight / 2;

        road.update(startCastle.x, startCastleCastelFooterPosY, endCastle.x, endCastleCastelFooterPosY);
        debugger
        this.addRoad(road);
    }

    // Удаление дороги
    cancelRoad(road: Road) {
        const index = this.roads.indexOf(road);
        if (index !== -1) {
            road.destroy();
            this.roads.splice(index, 1);
        }
    }

    // Получение всех дорог
    getAllRoads(): Road[] {
        return this.roads;
    }

    // Дополнительные методы по необходимости...
}
