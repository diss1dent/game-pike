import Road from '../objects/Road';
import { Castle } from '../interfaces/Castle';

export default class RoadManager {
    private roads: Road[];

    constructor() {
        this.roads = [];
    }

    // Добавление новой дороги
    addRoad(road: Road) {
        this.roads.push(road);
    }

    // Фиксация дороги
    finishRoad(road: Road, endCastle: Castle) {
        // Здесь логика для окончательной настройки и фиксации дороги
        // Например, можно установить конечную точку дороги и завершить её строительство
        // Если нужно, можно здесь же добавить дорогу в общий список
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
