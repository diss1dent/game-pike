import SocketManager from "../../app/api-socket/SocketManager";
import { store, toggleLoginModal } from "../../store/store";
import TextButton from "../components/TextButton";
import Background from "../objects/Background";
import { config } from "../../config";
import gameConfig from "../config/gameConfig";

class MainMenuScene extends Phaser.Scene {
    socketManager: SocketManager;

    constructor() {
        super('MainMenuScene');
        this.socketManager = new SocketManager();
    }

    create() {
        this.registry.set('socketManager', this.socketManager);
        
        Background.setFullScreen(this, 'background');
        
        //this.createPlayButton();
        this.createGameButton();

        if (!store.isAuthenticated) { // Проверяем, не авторизован ли уже пользователь
            this.createLoginButton();
        } else {
            this.displayUsername();
        }
    }

    /**
     * todo game with the ai
     */
    createPlayButton() {       
        // Размеры экрана
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        new TextButton(this, centerX, centerY, 'Start', () => {
            this.socketManager.connect(config.apiSocketURL, config.apiSocketOptions);
            // waiting for the game
            this.socketManager.on('startGame', (data) => {
                this.scene.start('GameScene', { castles: data.castles });
            });
        });
    }

    createGameButton() {
        const loginButtonX = this.scale.width / 2;
        const loginButtonY = this.scale.height / 2 + 200; // Размещаем ниже кнопки начала игры

        const gameButton = new TextButton(this, loginButtonX, loginButtonY, 'Find new game', () => {
            this.input.enabled = false;
            gameButton.setText('Looking for a game...');

            this.socketManager.connect(config.apiSocketURL, config.apiSocketOptions);
            this.socketManager.joinRoom();

            this.socketManager.on('waitingForPlayers', () => {
                gameButton.setText('Looking for a game...');
            });

            // waiting for the game
            this.socketManager.on('startGame', (data) => {
                this.input.enabled = true;
                gameButton.setText('Find new game');
                this.scene.start('GameScene', data);
                gameConfig.owners = Object.keys(data.ownerColors);
                gameConfig.playerId = 'player' + this.socketManager.socket?.id;
                gameConfig.ownerColors = data.ownerColors;
            });
        });
    }

    createLoginButton() {
        const loginButtonX = this.scale.width / 2;
        const loginButtonY = this.scale.height / 2 + 100; // Размещаем ниже кнопки начала игры

        new TextButton(this, loginButtonX, loginButtonY, 'Login', () => {
            this.input.enabled = false;
            toggleLoginModal();
        });
    }

    displayUsername() {
        const userNameX = this.scale.width / 2;
        const userNameY = this.scale.height / 2 + 100;
        this.add.text(userNameX, userNameY, `Welcome, ${store.userName}`, { fontSize: '32px', fill: '#FFF' }).setOrigin(0.5);
    }
}

export default MainMenuScene;
