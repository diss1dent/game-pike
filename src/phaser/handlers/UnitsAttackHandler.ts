import { OWNER } from '../config/constants';
import { EVENTS } from '../config/gameConfig';
import UnitsFactory from '../factories/UnitsFactory';
import EntityHelper from '../helpers/EntityHelper';
import { CastleInterface } from '../interfaces/Castle';
import { CastleManagerInterface } from '../interfaces/Manager';
import { UnitInterface } from '../interfaces/UnitsInterfaces';
import RoadManager from '../managers/RoadManager';

export default class UnitsAttackHandler {
    
    constructor(private scene: Phaser.Scene,
        private castleManager: CastleManagerInterface,
        private roadManager: RoadManager,
        private unitsFactory: UnitsFactory,
        
    ) {
        this.scene = scene;
        this.castleManager = castleManager;
        this.roadManager = roadManager;
        this.unitsFactory = unitsFactory;

        this.scene.events.on(EVENTS.unitArrived, this.unitArive, this);
    }

    public unitArive({unit, castle} : {unit: UnitInterface, castle: CastleInterface}) {
        if (unit.owner !== castle.owner) {
            castle.setLevel(castle.level - unit.damage)
        } else if (unit.owner === castle.owner) {
            if (castle.level === 100) {
                const roads = this.roadManager.getOutgoingRoadsFromCastle(castle);
                if (roads.length) {
                    const randomRoad = roads[Math.floor(Math.random() * roads.length)];
                    this.unitsFactory.spawnUnitsForAttack(castle, randomRoad.endCastle);
                }
                
                
            } else {
                castle.setLevel(castle.level + unit.damage);
            }            
        }
    
        if (castle.level <= 0) {
            this.conquerCastle(castle, unit.owner);
        }
    }
    
    public conquerCastle(castle: CastleInterface, newOwner: OWNER) {
        castle.owner = newOwner;
        this.roadManager.deleteOutgoingCastleRoads(castle);
        EntityHelper.updateTint(castle.castleSprite, castle.owner);
    
        if (this.castleManager.getAllCastlesByOwner(OWNER.computer).length <= 0) {
            this.scene.scene.start('VictoryScene'); 
            debugger
        } else if (this.castleManager.getAllCastlesByOwner(OWNER.player).length <= 0) {
            debugger
            this.scene.scene.start('GameOverScene'); 
        }
    }
}
