import { UNIT_TYPES } from "../config/constants";
import { CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import { UnitInterface } from "../interfaces/UnitsInterfaces";
import { Unit } from "../objects/Unit";
import RoadManager from "../managers/RoadManager";

export default class UnitsFactory {
    scene: Phaser.Scene;
    castleManager: CastleManagerInterface;
    roadManager: RoadManager;
    
    constructor(scene: Phaser.Scene, castleManager: CastleManagerInterface, roadManager: RoadManager) {
        this.scene = scene;
        this.castleManager = castleManager;
        this.roadManager = roadManager;
    }

    // Метод для создания и отправки юнитов к целевому замку
    spawnUnitsForAttack(attackingCastle: CastleInterface, targetCastle: CastleInterface) {
        // Создание юнита
        const unitType = UNIT_TYPES.warrior;
        const connectionPoint = this.roadManager.getConnectionPoint(attackingCastle);
        const unit = new Unit(
            this.scene,
            connectionPoint.x,
            connectionPoint.y,
            unitType,
            attackingCastle.owner,
        );
        unit.moveToCastle(targetCastle); // Отправляем юнита к целевому замку
    }
}