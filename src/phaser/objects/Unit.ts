import { CastleInterface } from "../interfaces/Castle";

class Unit {
    constructor(public owner: string, public speed: number, public strength: number, public targetCastle: CastleInterface, public originCastle: CastleInterface) {}

    // Метод для перемещения юнита будет реализован здесь
    move(deltaTime: number) {
        // Логика перемещения юнита в зависимости от его скорости и направления
    }
}
