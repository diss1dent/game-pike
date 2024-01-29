import Castle from '../objects/Castle';
import { Point } from '../interfaces/Point';

export default class RoadHelper {
    static isPathClear(startCastle: Castle, endCastle: Castle, allCastles: Castle[]): boolean {
        // Примерная реализация: проверяем, не пересекается ли линия между замками с другими замками
        const line = { start: { x: startCastle.x, y: startCastle.y }, end: { x: endCastle.x, y: endCastle.y } };
        
        return !allCastles.some(castle => {
            if (castle === startCastle || castle === endCastle) {
                return false;
            }
            return this.checkLineIntersection(line, { x: castle.x, y: castle.y, width: castle.width, height: castle.height });
        });
    }

    private static checkLineIntersection(line: { start: Point, end: Point }, rect: { x: number, y: number, width: number, height: number }): boolean {
        // Здесь реализация проверки пересечения линии с прямоугольником
        // Это может быть сложная геометрическая задача, зависит от точности, которую вы хотите достичь
        // ...
        return false; // Временно
    }
}
