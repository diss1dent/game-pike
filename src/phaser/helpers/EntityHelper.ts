import { OWNER } from "../config/constants";

export default class EntityHelper {
    static updateTint(sprite: Phaser.GameObjects.Sprite , owner: string) {
        // Изменение внешнего вида в зависимости от владельца
        if (owner === OWNER.player) {
            sprite.setTint(0x42A5F5); // Синий цвет для замка игрока
        } else if (owner === OWNER.computer) {
            sprite.setTint(0xEF5350); // Красный цвет для замка компьютера
        } else {
            sprite.setTint(0xBDBDBD); // для нейтральных замков
            sprite.setTint(0xFFFFFF); // для нейтральных замков
            sprite.setTint(0xFFFFFF); // для нейтральных замков
        }
    }
}