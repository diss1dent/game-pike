import { OWNER } from "../config/constants";
import gameConfig from "../config/gameConfig";
import { TEXT_STYLE_COMMON } from "../config/phaserUI";
import { CastleInterface } from "../interfaces/Castle";
import { UnitInterface } from "../interfaces/UnitsInterfaces";
import CastleSprite from "./castle/CastleSprite";
import HealthBar from "./castle/HealthBar";

export default class Castle implements CastleInterface {
    scene: Phaser.Scene;
    castleSprite: CastleSprite;
    owner: OWNER;
    level: number;
    //levelText: Phaser.GameObjects.Text;
    strength: number;
    healthBar!: HealthBar;

    constructor(scene: Phaser.Scene,
        x: number,
        y: number,
        owner: OWNER = OWNER.neutral,
        level: number = 0
        ) {
            this.owner = owner;
            this.scene = scene;
            this.castleSprite = new CastleSprite(scene, x, y, this);
            this.level = level;
            //this.levelText = this.createLevel(x, y);
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
        this.healthBar = new HealthBar(this.scene, this);
    }

    setLevel(level: number) {
        if (level < 0) {
            level = 0
        } else if(level > gameConfig.castleMaxLevel) {
            level = gameConfig.castleMaxLevel
        }

        this.level = level;
        //this.levelText.setText(`level: ${this.level}`);
        this.updateStrengthBasedOnLevel();
        this.healthBar.updateHealthBar(this.level, gameConfig.castleMaxLevel); 
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

    unitArive(unit: UnitInterface) {
        if (unit.owner !== this.owner) {
            this.setLevel(this.level - unit.damage)
        }

        if (this.level <= 0) {
            this.conquerCastle(this, unit.owner);
        }
    }

    conquerCastle(castle: CastleInterface, newOwner: OWNER) {
        castle.owner = newOwner;
        this.roadManager.deleteOutgoingCastleRoads(castle);
        EntityHelper.updateTint(castle.castleSprite, castle.owner);

        if (this.castleManager.getAllCastlesByOwner(OWNER.computer).length <= 0) {
            this.scene.scene.start('VictoryScene'); 
        } else if (this.castleManager.getAllCastlesByOwner(OWNER.player).length <= 0) {
            this.scene.scene.start('GameOverScene'); 
        }
    }
}