import CastleFactory from '../factories/CastleFactory';
import RoadFactory from '../factories/RoadFactory';
import RoadManager from '../managers/RoadManager';
import Background from '../objects/Background';
import RoadDeletionHandler from '../handlers/RoadDeletionHandler';
import CastleManager from '../managers/CastleManager';
import CastleConquestHandler from '../handlers/CastleConquestHandler';
import { RoadConstructionHandler } from '../handlers/RoadConstructionHandler';
import { AIHandler } from '../handlers/AIHandler';
import { GAME_LEVEL } from '../config/constants';
import CastleGrowthHandler from '../handlers/CastleGrowthHandler';

class GameScene extends Phaser.Scene {
    private castleFactory!: CastleFactory;
    private castleManager!: CastleManager;
    private roadFactory!: RoadFactory;
    private roadManager!: RoadManager;
    private custlesNumber: number = 10; // Можно оставить начальное значение здесь, так как оно не зависит от контекста сцены
    private lastUpdateTime!: number;
    private castleConquestHandler!: CastleConquestHandler;
    private castleGrowthHandler!: CastleGrowthHandler;
    private aiHandler!: AIHandler;

    constructor() {
        super('GameScene');
        
    }

    create() {
        this.castleManager = new CastleManager(this);
        this.castleFactory = new CastleFactory(this, this.castleManager);
        this.roadManager = new RoadManager(this);
        this.roadFactory = new RoadFactory(this, this.roadManager);
        this.custlesNumber = 10;
        this.lastUpdateTime = 0;

        this.castleGrowthHandler = new CastleGrowthHandler(this, this.castleManager, this.roadManager);
        this.castleConquestHandler = new CastleConquestHandler(this, this.castleManager, this.roadManager);
        this.aiHandler = new AIHandler(this, this.castleManager, this.roadManager, this.roadFactory);
        
        Background.setFullScreen(this, 'background2');
        this.castleFactory.createHomeCastles(GAME_LEVEL.level2);
        this.castleFactory.createRandomCastles(this.custlesNumber);
        new RoadDeletionHandler(this, this.roadManager, this.castleManager);
        new RoadConstructionHandler(this, this.roadFactory, this.roadManager, this.castleManager);
    }

    update(time: number, delta: any) {
        // Обновление элементов сцены
        this.castleGrowthHandler.update(time);
        this.castleConquestHandler.update(time);
        this.aiHandler.update(time);
    }
}

export default GameScene;