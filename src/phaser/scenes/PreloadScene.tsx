class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#ffffff'); 
        // Показываем индикатор загрузки
        // let preloadBar = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'preloadBar');
        // this.load.on('progress', (value: any) => {
        //     preloadBar.setScale(value, 1);
        // });

        // Здесь указываем ресурсы для загрузки
        this.load.image('background', 'assets/images/background.png');
        this.load.image('background2', 'assets/images/background2.webp');
        this.load.spritesheet('castle', 'assets/images/castles_9frames_fantasy2.png', {
            frameWidth: 1341 / 3 /* ширина фрейма */,
            frameHeight: 1024 / 3/* высота фрейма */
        });
        this.load.spritesheet('castle_sm4.1', 'assets/images/castle_sm4.1.png', {
            frameWidth: 1120 / 8 /* ширина фрейма */,
            frameHeight: 280 /* высота фрейма */
        });
        this.load.spritesheet('road', 'assets/images/road.png', {
            frameWidth: 25 /* ширина фрейма */,
            frameHeight: 25/* высота фрейма */
        });
        this.load.image('road-arrow', 'assets/images/road-arrow.png');
        //this.load.image('castle', 'assets/images/castles_9frames_fantasy2.png');
        // Другие ресурсы: изображения, спрайты, аудио и т.д.
    }

    create() {
        document.getElementById('loadingGif').style.display = 'none';
        this.scene.start('MainMenuScene'); // Переходим к главному меню после загрузки
    }
}

export default PreloadScene;
