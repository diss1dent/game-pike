import { GAME_LEVEL, OWNER } from "../config/constants";
import gameConfig from "../config/gameConfig";
import { CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import { PointInterface } from "../interfaces/PointInterface";
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

    createCastle(x: number, y: number, owner: OWNER = OWNER.neutral, castleLevel: number = 0) {
        const castle = new Castle(this.scene, x, y, owner, castleLevel);

        return castle;
    }

    createRandomCastles(custlesNumber: number) {
        // Создание замков
        for (let i = 0; i < custlesNumber; i++) {
            let position = this.getRandomPosition();
            let castleLevel = Phaser.Math.Between(25, gameConfig.castleMaxLevel);
            const castle = this.createCastle(position.x, position.y, OWNER.neutral, castleLevel);
            castle.startPlay();
            this.addCastle(castle);
        }
    }

    createHomeCastles = (gameLevel: string) => {
        this.createPlayerCastle(gameLevel);
        this.createComputerCastle(gameLevel);
    }

    createPlayerCastle = (gameLevel: string) => {
        const position = this.getPlayerPosition(gameLevel);
        const castle = this.createCastle(position.x, position.y, OWNER.player);
        castle.startPlay();
        this.addCastle(castle);
    }

    createComputerCastle = (gameLevel: string) => {
        const position = this.getComputerPosition(gameLevel);
        const castle = this.createCastle(position.x, position.y, OWNER.computer);
        castle.startPlay();
        this.addCastle(castle);
    }

    getRandomPosition() {
        let position = {x:0, y:0};
        let overlap;
        do {
            overlap = false;
            const gameWidth = Number(this.scene.game.config.width);
            const gameHeight = Number(this.scene.game.config.height);

            position = {
                x: Phaser.Math.Between(this.castleWidth / 2, gameWidth - this.castleWidth - this.castleWidth / 2),
                y: Phaser.Math.Between(this.castleHeight / 2, gameHeight - this.castleHeight - this.castleHeight / 2)
            };

            for (const castle of this.manager.getAll()) {
                if (this.isOverlapping(position, castle.castleSprite)) {
                    overlap = true;
                    break;
                }
            }
        } while (overlap);

        return position;
    }

    isOverlapping(pos1: PointInterface, pos2: PointInterface) {
        return pos1.x < pos2.x + this.castleWidth &&
               pos1.x + this.castleWidth > pos2.x &&
               pos1.y < pos2.y + this.castleHeight &&
               pos1.y + this.castleHeight > pos2.y;
    }

    getPlayerPosition(gameLevel: string) {
        const gameHeight = Number(this.scene.game.config.height);
        const gameWidth = Number(this.scene.game.config.width);

        switch (gameLevel) {
            case GAME_LEVEL.level1:                
                return {
                    x: this.castleWidth / 2,
                    y: gameHeight / 2 - this.castleHeight / 2
                };
            case GAME_LEVEL.level2:
                return {
                    x: this.castleWidth / 2 + gameWidth * 0.16,
                    y: gameHeight / 2 * 1.1 - this.castleHeight / 2
                };
                break;
        
            default:
                return {
                    x: this.castleWidth / 2,
                    y: gameHeight / 2 - this.castleHeight / 2
                };
                break;
        }
    }

    getComputerPosition(gameLevel: string) {
        const gameWidth = Number(this.scene.game.config.width);
        const gameHeight = Number(this.scene.game.config.height);

        switch (gameLevel) {
            case GAME_LEVEL.level1:                
                return {
                    x: gameWidth - this.castleWidth / 2,
                    y: gameHeight / 2 - this.castleHeight / 2
                };
            case GAME_LEVEL.level2:
                return {
                    x: gameWidth * 0.9 - this.castleWidth / 2,
                    y: gameHeight / 2 * 1.07 - this.castleHeight / 2
                };
                break;
        
            default:
                return {
                    x: gameWidth - this.castleWidth / 2,
                    y: gameHeight / 2 - this.castleHeight / 2
                };
                break;
        }
    }
}