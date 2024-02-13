import Road from '../objects/Road';
import { CastleInterface } from '../interfaces/Castle';
import { RoadBetweenCastlesInterface, RoadInterface } from '../interfaces/Road';
import { gameDesign } from '../config/gameConfig';
import RoadHelper from '../helpers/RoadHelper';
import { OWNER } from '../config/constants';

export default class RoadManager {
    private scene: Phaser.Scene;
    private roads: RoadBetweenCastlesInterface[];

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.roads = [];
    }

    addRoad(road: RoadInterface) {
        if (this.isRoadBetweenCastles(road) && !this.roadExists(road.startCastle, road.endCastle)) {
            this.roads.push(road);
        }
    }
    
    isRoadBetweenCastles(road: RoadInterface): road is RoadBetweenCastlesInterface {
        return road.startCastle !== null && road.endCastle !== null;
    }

    addRoadBetweenCastles(startCastle: CastleInterface, endCastle: CastleInterface, owner: OWNER) {
        const road = new Road(this.scene, owner, startCastle, endCastle);
        const startCastleConnectionPoint = this.getConnectionPoint(startCastle);
        const endCastleConnectionPoint = this.getConnectionPoint(endCastle);

        road.update(startCastleConnectionPoint.x, startCastleConnectionPoint.y, endCastleConnectionPoint.x, endCastleConnectionPoint.y);
        this.addRoad(road);
    }

    getConnectionPoint(castle: CastleInterface) {
        return RoadHelper.getConnectionPoint(castle);
    }

    deleteRoad(road: RoadBetweenCastlesInterface) {
        const index = this.roads.indexOf(road);
        if (index !== -1) {
            road.destroy();
            this.roads.splice(index, 1);
        }
    }

    deleteOutgoingCastleRoads(castle: CastleInterface) {
        this.roads = this.roads.filter(road => {
            if (road.startCastle === castle) {
                road.destroy();
                return false;
            }
            return true;
        });      
    }

    getAllRoads(): RoadBetweenCastlesInterface[] {
        return this.roads;
    }

    roadExists(startCastle: CastleInterface, endCastle:CastleInterface) {
        return this.roads.some(r => (r.startCastle === startCastle && r.endCastle === endCastle) ||
                                    (r.startCastle === endCastle && r.endCastle === startCastle));
    }

    getAllCastleRoads(castle: CastleInterface): RoadBetweenCastlesInterface[]  {
        return this.roads.filter(r => r.startCastle === castle && r.endCastle === castle);
    }
    
    getOutgoingRoadsFromCastle(castle: CastleInterface): RoadBetweenCastlesInterface[] {
        return this.roads.filter(r => r.startCastle === castle);
    }

    getIncomingRoadsToCastle(castle: CastleInterface): RoadBetweenCastlesInterface[] {
        return this.roads.filter(r => r.endCastle === castle);
    }

}
