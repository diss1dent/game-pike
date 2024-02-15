import { OWNER } from "../config/constants";
import CastleSprite from "../objects/castle/CastleSprite";

export interface CastleInterface {
    //unitArive(unit: UnitInterface): void;
    //damage(damage: number): unknown;   
    scene: Phaser.Scene;
    castleSprite: CastleSprite;
    owner: OWNER;
    level: number;
    strength: number;
    //levelText: Phaser.GameObjects.Text;
    setLevel(level: number): void
    containsPoint(point: Phaser.Math.Vector2): boolean
}