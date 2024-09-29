import { OWNER } from "../config/constants";
import { CastleDataInterface, CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import Castle from "../objects/Castle";

export default class CastleFactory {
    scene;
    castleWidth: number;
    castleHeight: number;
    manager: CastleManagerInterface

    constructor(scene: Phaser.Scene, manager: CastleManagerInterface) {
        this.scene = scene;
        this.manager = manager;
        this.castleWidth = 80; // Задайте реальные размеры
        this.castleHeight = 110; // Задайте реальные размеры
        // Предположим, что анимация уже создана в сцене
    }

    addCastle(castle: CastleInterface) {
        this.manager.add(castle);
    }

    createCastle(id: number, x: number, y: number, owner: string = OWNER.neutral, castleLevel: number = 0) {
        const castle = new Castle(id, this.scene, x, y, owner, castleLevel);
        castle.startPlay();
        this.addCastle(castle);
    }

    createCastlesFromData(castleData: CastleDataInterface[]) {
        for (const data of castleData) {
            this.createCastle(data.id, data.x, data.y, data.owner, data.level);
        }
    }
}