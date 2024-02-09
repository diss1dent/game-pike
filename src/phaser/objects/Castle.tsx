import { OWNER } from "../config/constants";
import gameConfig from "../config/gameConfig";
import { TEXT_STYLE_COMMON } from "../config/phaserUI";
import { CastleInterface } from "../interfaces/Castle";
import CastleSprite from "./CastleSprite";

export default class Castle implements CastleInterface {
    scene: Phaser.Scene;
    castleSprite: CastleSprite;
    owner: string;
    level: number;
    levelText: Phaser.GameObjects.Text;
    strength: number;

    constructor(scene: Phaser.Scene,
        x: number,
        y: number,
        owner: string = OWNER.neutral,
        level: number = 0
        ) {
            this.owner = owner;
            this.scene = scene;
            this.castleSprite = new CastleSprite(scene, x, y, this);
            this.level = level;
            this.levelText = this.createLevel(x, y);
            this.strength = 1; // Initialize strength
            this.updateStrengthBasedOnLevel(); // Initial strength adjustment based on level
            
    }

    createLevel(x: number, y: number) {
        const castleSize = this.castleSprite.getSize();
        const levelPoint = {
            x: x,
            y: y - castleSize.height / 2
        }

        return this.scene.add.text(levelPoint.x, levelPoint.y, `level: ${this.level}`, TEXT_STYLE_COMMON).setOrigin(0.5);
    }

    startPlay() {
        // Воспроизведение анимации 'castle-stay'
        this.castleSprite.startPlay();
    }

    setLevel(level: number) {
        if (level < 0) {
            level = 0
        } else if(level > gameConfig.castleMaxLevel) {
            level = gameConfig.castleMaxLevel
        }

        this.level = level;
        this.levelText.setText(`level: ${this.level}`);
        this.updateStrengthBasedOnLevel();
    }

    updateStrengthBasedOnLevel() {
        // Reset strength to base before applying level-based adjustments
        this.strength = 1; 
        if (this.level > 60) {
            this.strength += 2; // Add 1 more strength for levels over 60
        } else if (this.level > 30) {
            this.strength += 1; // Add 1 strength for levels over 30
        }
    }

    containsPoint(point: Phaser.Math.Vector2): boolean {
        const bounds = this.castleSprite.getBounds();
        return bounds.contains(point.x, point.y);
    }
}