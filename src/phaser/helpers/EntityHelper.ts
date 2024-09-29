import gameConfig from "../config/gameConfig";

export default class EntityHelper {
    static updateTint(sprite: Phaser.GameObjects.Sprite , owner: string) {
        // change color depending on castle owner
        if (gameConfig.ownerColors[owner]) {
            sprite.setTint(gameConfig.ownerColors[owner]);
        } else {
            sprite.setTint(0xFFFFFF); // для нейтральных замков
        }
    }
}