import CastleFactory from '../Factories/CastleFactory';
import RoadFactory from '../Factories/RoadFactory';
import RoadManager from '../managers/RoadManager';
import RoadHelper from '../helpers/RoadHelper';
import { CastleInterface } from '../interfaces/Castle';
import Background from '../objects/Background';
import { CASTLES_THAT_GROWS, CASTLE_MAX_LEVEL, OWNER } from '../config/constants';
import RoadDeletionHandler from '../handlers/RoadDeletionHandler';
import CastleManager from '../managers/CastleManager';

class GameScene extends Phaser.Scene {
    private castleFactory: CastleFactory;
    private castleManager: CastleManager;
    private roadFactory: RoadFactory;
    private roadManager: RoadManager;
    private custlesNumber: number;
    private selectedCastle: CastleInterface | null;
    private lastUpdateTime: number;

    constructor() {
        super('GameScene');
        this.castleManager = new CastleManager(this);
        this.castleFactory = new CastleFactory(this, this.castleManager);
        this.roadFactory = new RoadFactory(this);
        this.roadManager = new RoadManager(this);
        this.custlesNumber = 10;
        this.selectedCastle = null;
        this.lastUpdateTime = 0;
    }

    create() {
        Background.setFullScreen(this, 'background');

        this.castleFactory.createRandomCastles(this.custlesNumber);
        this.castleFactory.createHomeCastles();
        new RoadDeletionHandler(this, this.roadManager);        
        this.initMouseEvents();
    }

    initMouseEvents() {
        this.input.on('pointermove', this.handleMouseMove);
        this.input.on('pointerup', this.handleMouseUp);

        this.events.on('castle-selected', (castle: CastleInterface) => {
            this.selectedCastle = castle;
            // Запуск создания дороги при выборе замка
            if (this.selectedCastle && this.selectedCastle.owner === OWNER.player) {
                this.roadFactory.startRoad(this.selectedCastle.castleSprite.x, this.selectedCastle.castleSprite.y, OWNER.player);
            }
        });
    }

    handleMouseMove = (pointer: Phaser.Input.Pointer) => {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            const startCastleCastelFooterPosY = this.selectedCastle.castleSprite.y + this.selectedCastle.castleSprite.height * this.selectedCastle.castleSprite.scaleY / 2 - this.roadFactory.roadHeight / 2;
            this.roadFactory.updateRoad(this.selectedCastle.castleSprite.x, startCastleCastelFooterPosY, pointer.x, pointer.y);
        }
    };

    handleMouseUp = (pointer: Phaser.Input.Pointer) => {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            let endCastle = this.castleManager.getAll().find(castle =>
                castle.castleSprite.getBounds().contains(pointer.x, pointer.y)
            );

            if (endCastle && endCastle !== this.selectedCastle) {
                this.roadManager.addRoadBetweenCastles(this.selectedCastle, endCastle, OWNER.player);
            }
            
            this.roadFactory.destroyCurrentRoad();
            this.selectedCastle = null;
        }
    };

    update(time: number, delta: any) {
        // Обновление элементов сцены
        // Периодическое увеличение уровней замков игрока и компьютера
        if (time - this.lastUpdateTime > 1000) { // Каждую секунду
            this.castleManager.getAll().forEach(castle => {
                if ((CASTLES_THAT_GROWS.includes(castle.owner)) && castle.level < CASTLE_MAX_LEVEL) {
                    castle.updateLevel(castle.level + 1); // Увеличиваем уровень
                }
            });
            this.lastUpdateTime = time;
        }
    }
}

export default GameScene;