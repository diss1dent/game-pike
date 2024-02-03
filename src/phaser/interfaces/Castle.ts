import CastleSprite from "../objects/CastleSprite";

export interface CastleInterface {   
    scene: Phaser.Scene;
    castleSprite: CastleSprite;
    owner: string;
    level: number;
    strength: number;
    levelText: Phaser.GameObjects.Text;
    setLevel(level: number): void
    containsPoint(point: Phaser.Math.Vector2): boolean
}