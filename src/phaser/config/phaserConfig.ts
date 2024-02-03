// import { Preloader } from '../scenes/Preloader';
// import { Play } from '../scenes/';
// export const phaserCconfig = {
//     title: 'Card Memory Game',
//     type: Phaser.AUTO,
//     backgroundColor: "#192a56",
//     width: 1024,
//     height: 480,
//     parent: "phaser-example",
//     render: {
//         pixelArt: true,
//     },
//     scene: [
//         Preloader,
//         Play
//     ]
// };

import BootScene from '../scenes/BootScene';
import PreloadScene from '../scenes/PreloadScene';
import MainMenuScene from '../scenes/MainMenuScene';
import GameScene from '../scenes/GameScene';
import GameOverScene from '../scenes/GameOverScene';
import VictoryScene from '../scenes/VictoryScene';

export const phaserConfig = {
    title: 'Pike',
    type: Phaser.AUTO, // Phaser будет автоматически выбирать между WebGL и Canvas
    width: window.innerWidth - 20, // ширина игрового поля
    height: window.innerHeight - 20, // высота игрового поля
    //parent: 'game-container', // ID DOM-элемента для размещения игры
    backgroundColor: "#ecf2ff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // гравитация для аркадной физики
            debug: false // показывать или нет отладочную информацию физики
        }
    },
    scene: [
        BootScene,     // Сцена для начальной загрузки
        PreloadScene,  // Сцена для предзагрузки ассетов
        MainMenuScene, // Сцена главного меню
        GameScene,     // Основная игровая сцена
        GameOverScene,  // Сцена окончания игры
        VictoryScene  // Сцена окончания игры
    ],
    audio: {
        disableWebAudio: false // Включить Web Audio API
    },
    scale: {
        mode: Phaser.Scale.FIT, // Режим масштабирования
        autoCenter: Phaser.Scale.CENTER_BOTH // Центрирование игры на экране
    },
    render: {
        pixelArt: true, // Для пиксельной графики
        antialias: false // Антиалиасинг (сглаживание) для текстур
    },
    fps: {
        target: 60, // Целевой FPS
        forceSetTimeOut: true // Использовать setTimeout для управления FPS
    }
};

export default phaserConfig;
