export default class Background {
    static setFullScreen(scene: Phaser.Scene, key: string) {
        const { width, height } = scene.sys.game.config;
        const background = scene.add.image(0, 0, key).setOrigin(0, 0);
        background.setDisplaySize(+width, +height);
    }
}