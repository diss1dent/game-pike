import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Здесь загружаем ассеты, необходимые для PreloadScene (например, изображения для загрузочного экрана)
        this.load.image('preloadBar', 'assets/images/preload-bar.png');
        //this.load.image('loading', 'assets/images/loading.gif');
        this.cameras.main.setBackgroundColor('#ffffff'); 
    }

    create() {
        document.getElementById('loadingGif').style.display = 'block';
        
        this.scene.start('PreloadScene'); // Переход к PreloadScene после предварительной загрузки
    }
}

export default BootScene;