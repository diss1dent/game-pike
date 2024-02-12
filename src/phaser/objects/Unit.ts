import { OWNER } from "../config/constants";
import { EVENTS } from "../config/gameConfig";
import RoadHelper from "../helpers/RoadHelper";
import { CastleInterface } from "../interfaces/Castle";
import { UnitInterface } from "../interfaces/UnitsInterfaces";
import UnitSprite from "./unit/UnitSprite";

export class Unit implements UnitInterface{
    scene: Phaser.Scene;
    type: string;
    owner: OWNER;
    speed: number;
    damage: number;
    targetCastle: CastleInterface | null;
    moving: boolean;
    sprite: UnitSprite;
    
    constructor(scene: Phaser.Scene, x: number, y: number, type: string, owner: OWNER) {
        this.scene = scene;
        this.type = type; // 'archer' или 'warrior'
        this.owner = owner;
        this.speed = type === 'archer' ? 100 : 150;
        this.damage = type === 'archer' ? 1 : 1;
        this.targetCastle = null;
        this.moving = false;
        this.sprite = new UnitSprite(scene, x, y, 'knight_run_dir1'); // Используем UnitSprite для отображения
    }

    // Начать движение к замку
    moveToCastle(castle: CastleInterface) {
        this.targetCastle = castle;
        const connectionPoint = RoadHelper.getConnectionPoint(castle);
        this.scene.physics.moveTo(this.sprite, connectionPoint.x, connectionPoint.y, this.speed);        
        this.scene.physics.add.overlap(this.sprite, castle.castleSprite, () => {
            this.attackCastle();
        }, undefined, this);
        this.sprite.moveAnimation(castle);
    }

    // // Обновление позиции юнита
    // update(time, delta) {
    //     if (!this.moving || !this.targetCastle) return;
    
    //     // Расчет движения к замку
    //     // Если юнит достиг замка
    //     if (reachedCastle) {
    //         this.attackCastle();
    //     }
    // }

    // Атака замка
    attackCastle() {
        if (!this.targetCastle) return;
        // Логика атаки замка
        // Нанесение урона замку
        //this.unitsAttackHandler.unitArive(this, this.targetCastle);
        this.scene.events.emit(EVENTS.unitArrived, {unit: this, castle: this.targetCastle })
        if (this.type !== 'archer') {
            // Воины исчезают после атаки
            this.destroy();
        } else {
            // Логика для лучников (например, начать стрельбу)
        }
    }
    
    destroy() {
        this.sprite.destroy();
    }
}