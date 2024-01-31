import Road from '../objects/Road';
import { CastleInterface } from '../interfaces/Castle';
import { RoadBetweenCastlesInterface, RoadInterface } from '../interfaces/Road';

export default class RoadManager {
    private scene: Phaser.Scene;
    private roads: RoadBetweenCastlesInterface[];
    private roadWidth: number;
    private roadHeight: number;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.roads = [];
        this.roadWidth = 25;
        this.roadHeight = 25;
    }

    addRoad(road: RoadInterface) {
        if (this.isRoadBetweenCastles(road) && !this.roadExists(road.startCastle, road.endCastle)) {
            this.roads.push(road);
        }
    }
    
    isRoadBetweenCastles(road: RoadInterface): road is RoadBetweenCastlesInterface {
        return road.startCastle !== null && road.endCastle !== null;
    }

    addRoadBetweenCastles(startCastle: CastleInterface, endCastle: CastleInterface, owner: string) {
        const road = new Road(this.scene, this.roadWidth, owner, startCastle, endCastle);
        const startCastleConnectionPoint = this.getConnectionPoint(startCastle);
        const endCastleConnectionPoint = this.getConnectionPoint(endCastle);

        road.update(startCastleConnectionPoint.x, startCastleConnectionPoint.y, endCastleConnectionPoint.x, endCastleConnectionPoint.y);
        this.addRoad(road);
    }

    getConnectionPoint(castle: CastleInterface) {
        return {
            x: castle.castleSprite.x,
            y: castle.castleSprite.y + castle.castleSprite.height * castle.castleSprite.scaleY / 2 - this.roadHeight / 2,
        }
    }

    deleteRoad(road: RoadBetweenCastlesInterface) {
        const index = this.roads.indexOf(road);
        if (index !== -1) {
            road.destroy();
            this.roads.splice(index, 1);
        }
    }

    getAllRoads(): RoadBetweenCastlesInterface[] {
        return this.roads;
    }

    roadExists(startCastle: CastleInterface, endCastle:CastleInterface) {
        return this.roads.some(r => (r.startCastle === startCastle && r.endCastle === endCastle) ||
                                    (r.startCastle === endCastle && r.endCastle === startCastle));
    }
}
