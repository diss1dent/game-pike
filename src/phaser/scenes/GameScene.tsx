import CastleFactory from '../factories/CastleFactory';
import RoadFactory from '../factories/RoadFactory';
import RoadManager from '../managers/RoadManager';
import Background from '../objects/Background';
import RoadDeletionHandler from '../handlers/RoadDeletionHandler-';
import CastleManager from '../managers/CastleManager';
//import CastleConquestHandler from '../handlers/CastleConquestHandler';
import { RoadConstructionHandler } from '../handlers/RoadConstructionHandler-not used';
import { AIHandler } from '../handlers/AIHandler';
import CastleGrowthHandler from '../handlers/CastleGrowthHandler';
import SpawnUnitsHandler from '../handlers/SpawnUnitsHandler';
import UnitsAttackHandler from '../handlers/UnitsAttackHandler';
import UnitsFactory from '../factories/UnitsFactory';
import { CastleDataInterface } from '../interfaces/Castle';
import SocketManager from '../../app/api-socket/SocketManager';
import CameraController from '../events/CameraController-not used';
import MouseActionManager from '../events/MouseActionManager';
import CameraAction from '../events/CameraAction';
import RoadConstructionAction from '../events/RoadConstructionAction';
import RoadDeletionAction from '../events/RoadDeletionAction';

class GameScene extends Phaser.Scene {
    private cameraController!: CameraController;
    private mouseActionManager!: MouseActionManager;
    private socketManager!: SocketManager;
    private castleFactory!: CastleFactory;
    private castleManager!: CastleManager;
    private roadFactory!: RoadFactory;
    private roadManager!: RoadManager;
    private unitsFactory!: UnitsFactory;
    //private castleConquestHandler!: CastleConquestHandler;
    private spawnUnitsHandler!: SpawnUnitsHandler;
    private castleGrowthHandler!: CastleGrowthHandler;
    private aiHandler!: AIHandler;
    unitsAttackHandler!: UnitsAttackHandler;
    roadDeletionHandler!: RoadDeletionHandler;
    roadConstructionHandler!: RoadConstructionHandler;

    constructor() {
        super('GameScene');        
    }

    init(data: { castles: CastleDataInterface[], ownerColors: [] }) {
        this.castleManager = CastleManager.getInstance(this);
        this.castleManager.reset();
        this.castleFactory = new CastleFactory(this, this.castleManager);
        this.roadManager = new RoadManager(this);
        this.roadFactory = new RoadFactory(this, this.roadManager);
        this.unitsFactory = new UnitsFactory(this, this.castleManager, this.roadManager);

        this.castleFactory.createCastlesFromData(data.castles);
    }

    create() {
        this.cameras.main.setBounds(0, 0, 1920, 1024);
        this.physics.world.setBounds(0, 0, 1920, 1024);

        this.socketManager = this.registry.get('socketManager') as SocketManager;
        
        //this.cameraController = new CameraController(this);
        // this.mouseActionManager = new MouseActionManager(this);
        // const cameraAction = new CameraAction(this);
        // this.mouseActionManager.registerAction(cameraAction);

        // Инициализация MouseActionManager
        this.mouseActionManager = new MouseActionManager(this);
        // Регистрация действия камеры
        const cameraAction = new CameraAction(this);
        this.mouseActionManager.registerAction(cameraAction);
        // Регистрация действия строительства дороги
        const roadConstructionAction = new RoadConstructionAction(this, this.roadFactory, this.roadManager, this.castleManager, this.socketManager);
        this.mouseActionManager.registerAction(roadConstructionAction);
        // Регистрация действия удаления дороги
        const roadDeletionAction = new RoadDeletionAction(this, this.roadManager, this.castleManager, this.socketManager);
        this.mouseActionManager.registerAction(roadDeletionAction);
      
        this.castleGrowthHandler = new CastleGrowthHandler(this, this.castleManager, this.roadManager);
        this.spawnUnitsHandler = new SpawnUnitsHandler(this, this.castleManager, this.roadManager, this.unitsFactory);
        this.unitsAttackHandler = new UnitsAttackHandler(this, this.castleManager, this.roadManager, this.unitsFactory);
        this.aiHandler = new AIHandler(this, this.castleManager, this.roadManager, this.roadFactory);

        Background.setFullScreen(this, 'background2');

        //this.roadDeletionHandler = new RoadDeletionHandler(this, this.roadManager, this.castleManager);
        //this.roadConstructionHandler = new RoadConstructionHandler(this, this.roadFactory, this.roadManager, this.castleManager, this.socketManager);
    }

    update(time: number, delta: any) {
        // Обновление элементов сцены
        this.castleGrowthHandler.update(time);
        //this.castleConquestHandler.update(time);
        this.spawnUnitsHandler.update(time);
        this.aiHandler.update(time);
    }
}

export default GameScene;