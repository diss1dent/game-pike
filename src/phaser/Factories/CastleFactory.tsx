import { CASTLE_MAX_LEVEL, OWNER } from "../config/constants";
import { CastleManagerInterface } from "../interfaces/Manager";
import { Point } from "../interfaces/Point";
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

    addCastle(castle:Castle) {
        this.manager.add(castle);
    }

    createCastle(x: number, y: number, owner: string = OWNER.neutral, castleLevel: number = 0) {
        const castle = new Castle(this.scene, x, y, owner, castleLevel);
        this.scene.add.existing(castle.castleSprite); // Добавление замка в сцену
        
        return castle;
    }

    createRandomCastles(custlesNumber: number) {
        // Создание замков
        for (let i = 0; i < custlesNumber; i++) {
            let position = this.getRandomPosition();
            let castleLevel = Phaser.Math.Between(25, CASTLE_MAX_LEVEL);
            const castle = this.createCastle(position.x, position.y, OWNER.neutral, castleLevel);
            castle.startPlay();
            this.addCastle(castle);
        }
    }

    createHomeCastles = () => {
        this.createLeftSideCastle();
        this.createRightSideCastle();
    }

    createLeftSideCastle = () => {
        const gameHeight = Number(this.scene.game.config.height);
        const position = {
            x: this.castleWidth / 2,
            y: gameHeight / 2 - this.castleHeight / 2
        };
        const castle = this.createCastle(position.x, position.y, OWNER.player);
        castle.startPlay();
        this.addCastle(castle);
    }

    createRightSideCastle = () => {
        const gameWidth = Number(this.scene.game.config.width);
        const gameHeight = Number(this.scene.game.config.height);
        const position = {
            x: gameWidth - this.castleWidth / 2,
            y: gameHeight / 2 - this.castleHeight / 2
        };
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
                if (this.isOverlapping(position, castle)) {
                    overlap = true;
                    break;
                }
            }
        } while (overlap);

        return position;
    }

    isOverlapping(pos1: Point, pos2: Point) {
        return pos1.x < pos2.x + this.castleWidth &&
               pos1.x + this.castleWidth > pos2.x &&
               pos1.y < pos2.y + this.castleHeight &&
               pos1.y + this.castleHeight > pos2.y;
    }
}