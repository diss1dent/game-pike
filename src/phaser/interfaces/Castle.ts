import CastleSprite from "../objects/CastleSprite";

export interface CastleInterface {
    scene: Phaser.Scene;
    castleSprite: CastleSprite;
    owner: string;
    level: number;
    levelText: Phaser.GameObjects.Text;
    updateLevel(level: number): void
}