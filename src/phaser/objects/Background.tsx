export default class Background {
    static setFullScreen(scene: Phaser.Scene, key: string) {
        const { width, height } = scene.sys.game.config;
        const background = scene.add.image(0, 0, key).setOrigin(0, 0);
        background.setDisplaySize(+width, +height);
        background.setDisplaySize(+1920, +1024);

        // const background = scene.add.image(0, 0, key).setOrigin(0).setScrollFactor(0); 
        // background.setDisplaySize(scene.physics.world.bounds.width, scene.physics.world.bounds.height); // Приводим размер фона к размеру мира
    }
}