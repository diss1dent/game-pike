import { OWNER } from "../config/constants";
import { TEXT_STYLE_COMMON } from "../config/phaserUI";
import { CastleInterface } from "../interfaces/Castle";
import CastleSprite from "./CastleSprite";

export default class Castle implements CastleInterface {
    scene: Phaser.Scene;
    castleSprite: CastleSprite;
    owner: string;
    level: number;
    levelText: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene,
        x: number,
        y: number,
        owner: string = OWNER.neutral,
        level: number = 0
        ) {
            this.owner = owner;
            this.scene = scene;
            this.castleSprite = new CastleSprite(scene, x, y, this, owner);
            this.level = level;
            this.levelText = this.createLevel(x, y);
            
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

    updateLevel(level: number) {
        this.level = level;
        this.levelText.setText(`level: ${this.level}`);
    }

}