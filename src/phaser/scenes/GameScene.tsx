import CastleFactory from '../Factories/CastleFactory';
import RoadFactory from '../Factories/RoadFactory';
import RoadManager from '../managers/RoadManager';
import RoadHelper from '../helpers/RoadHelper';
import { Castle } from '../interfaces/Castle';
import Background from '../objects/Background';

class GameScene extends Phaser.Scene {
    private castleFactory: CastleFactory;
    private roadFactory: RoadFactory;
    private roadManager: RoadManager;
    private custlesNumber: number;
    private selectedCastle: Castle | null;

    constructor() {
        super('GameScene');
        this.castleFactory = new CastleFactory(this);
        this.roadFactory = new RoadFactory(this);
        this.roadManager = new RoadManager();
        this.custlesNumber = 10;
        this.selectedCastle = null;
    }

    create() {
        Background.setFullScreen(this, 'background');

        this.castleFactory.createRandomCastles(this.custlesNumber);
        this.castleFactory.createHomeCastles();
        this.initMouseEvents();
    }

    initMouseEvents() {
        this.input.on('pointermove', this.handleMouseMove);
        this.input.on('pointerup', this.handleMouseUp);

        this.events.on('castle-selected', (castle: Castle) => {
            this.selectedCastle = castle;
        });
    }

    handleMouseMove = (pointer: Phaser.Input.Pointer) => {
        if (this.selectedCastle) {
            this.roadFactory.updateRoad(pointer.x, pointer.y);
        }
    };

    handleMouseUp = (pointer: Phaser.Input.Pointer) => {
        if (this.selectedCastle && this.roadFactory.currentRoad) {
            let endCastle = this.castleFactory.castles.find(castle =>
                castle.getBounds().contains(pointer.x, pointer.y)
            );

            if (endCastle && endCastle !== this.selectedCastle) {
                this.roadManager.finishRoad(this.roadFactory.currentRoad, endCastle);
                this.roadFactory.currentRoad = null;
            } else {
                this.roadManager.cancelRoad(this.roadFactory.currentRoad);
                this.roadFactory.currentRoad = null;
            }

            this.selectedCastle = null;
        }
    };

    update() {
        // Обновление элементов сцены
    }
}

export default GameScene;