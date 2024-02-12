import { DEPTH, DIRECTIONS } from "../../config/constants";
import { gameDesign } from "../../config/gameConfig";
import { CastleInterface } from "../../interfaces/Castle";

export default class UnitSprite extends Phaser.Physics.Arcade.Sprite {
// export default class UnitSprite extends Phaser.GameObjects.Sprite {
    knightAnimationPrefix = 'knight_run_dir_';
    imageRealHeight = 256;
    imageRealWidth = 256;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame: string | number | undefined = undefined) {
        super(scene, x, y, texture, frame);

        // Направления анимации следуют порядку загрузки: SW, W, NW, и так далее
        Object.values(DIRECTIONS).forEach((direction) => {
            if (!this.scene.anims.exists(`${this.knightAnimationPrefix + direction}`)) {
                this.anims.create({
                    key: `${this.knightAnimationPrefix + direction}`,
                    frames: this.anims.generateFrameNumbers(this.knightAnimationPrefix + `${direction}`, { start: 0, end: 7 }),
                    frameRate: 10,
                    repeat: -1
                });
            }
        });
        this.setScale(gameDesign.unitWariorWidth / this.imageRealHeight, gameDesign.unitWariorHeight / this.imageRealWidth);
        this.setDepth(DEPTH.unit);

        scene.physics.add.existing(this);
        scene.add.existing(this); // Добавляем спрайт в сцену
    }
    
    // Функция для определения направления анимации на основе угла
    getAnimationDirection(angle: number): string {
        // Преобразуем угол в положительный диапазон [0, 360] 0 градусов было направлено вверх
        angle = (angle + 360) % 360;

        // Затем определяем направление на основе скорректированного угла
        if (angle >= 337.5 || angle < 22.5) {
            return DIRECTIONS.NORTH; // Вверх
        } else if (angle >= 22.5 && angle < 67.5) {
            return DIRECTIONS.NORTH_EAST;
        } else if (angle >= 67.5 && angle < 112.5) {
            return DIRECTIONS.EAST; // Вправо
        } else if (angle >= 112.5 && angle < 157.5) {
            return DIRECTIONS.SOUTH_EAST;
        } else if (angle >= 157.5 && angle < 202.5) {
            return DIRECTIONS.SOUTH; // Вниз
        } else if (angle >= 202.5 && angle < 247.5) {
            return DIRECTIONS.SOUTH_WEST;
        } else if (angle >= 247.5 && angle < 292.5) {
            return DIRECTIONS.WEST; // Влево
        } else if (angle >= 292.5 && angle < 337.5) {
            return DIRECTIONS.NORTH_WEST;
        }

        return DIRECTIONS.EAST
    }

    // Метод для анимации движения юнита
    moveAnimation(target: CastleInterface) {
        let angle = Phaser.Math.Angle.Between(this.x, this.y, target.castleSprite.x, target.castleSprite.y);
        angle = Phaser.Math.RadToDeg(angle); // Конвертируем радианы в градусы
        // Корректировка так, чтобы 0 градусов соответствовало направлению "вверх"
        angle = (angle + 360 + 90) % 360; // Добавляем 90 градусов, чтобы сдвинуть угол

        const direction = this.getAnimationDirection(angle);
        this.startPlay(direction);
    }

    startPlay(direction: string) {
        this.anims.play(this.knightAnimationPrefix + `${direction}`);
        this.correctSpriteBody();
    }

    correctSpriteBody() {
        const body = this.body as Phaser.Physics.Arcade.Body;
        // Вычисляем смещение, чтобы центрировать физическое тело
        const offsetX = (this.width * 0.45 );
        const offsetY = (this.height * 0.35);

        body.setOffset(offsetX, offsetY);

    }
}