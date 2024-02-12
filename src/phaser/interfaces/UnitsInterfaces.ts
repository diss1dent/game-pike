import { OWNER } from "../config/constants";
import UnitSprite from "../objects/unit/UnitSprite";
import { CastleInterface } from "./Castle";

export interface UnitInterface {
    owner: OWNER;
    scene: Phaser.Scene;
    type: string;
    speed: number;
    damage: number;
    targetCastle: CastleInterface | null;
    moving: boolean;
    sprite: UnitSprite;
    moveToCastle(castle: CastleInterface):void;
    //update(time: number, delta: number):void;
    attackCastle():void
    destroy():void
}