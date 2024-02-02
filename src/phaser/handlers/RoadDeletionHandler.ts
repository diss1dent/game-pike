import { CastleManagerInterface } from "../interfaces/Manager";
import { RoadBetweenCastlesInterface } from "../interfaces/Road";
import RoadManager from "../managers/RoadManager";

export default class RoadDeletionHandler {
    private scene: Phaser.Scene;
    private roadManager: RoadManager;
    private castleManager: CastleManagerInterface;
    private startPoint: Phaser.Math.Vector2 | null;
    private endPoint: Phaser.Math.Vector2 | null;

    private graphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, roadManager: RoadManager, castleManager: CastleManagerInterface) {
        this.scene = scene;
        this.roadManager = roadManager;
        this.castleManager = castleManager;
        this.startPoint = null;
        this.endPoint = null;

        this.scene.input.on('pointerdown', this.handlePointerDown.bind(this));
        this.scene.input.on('pointerup', this.handlePointerUp.bind(this));

        this.graphics = scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 } });
    }    

    handlePointerDown(pointer: PointerEvent) {
        const startPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);
        // Check if the startPoint is within any castle
        if (this.isPointInsideAnyCastle(startPoint)) {
            // If startPoint is inside a castle, consider this as an intent to draw a road.
            this.startPoint = null;
            return;
        }
        this.startPoint = startPoint
    }
    
    isPointInsideAnyCastle(point: Phaser.Math.Vector2): boolean {
        for (let castle of this.castleManager.getAll()) {
            if (castle.containsPoint(point)) {
                return true;
            }
        }

        return false;
    }

    handlePointerUp(pointer: PointerEvent) {
        this.endPoint = new Phaser.Math.Vector2(pointer.x, pointer.y);
        this.checkAndDeleteRoad();
    }

    checkAndDeleteRoad() {
        if (this.startPoint && this.endPoint) {
            const crossedRoad = this.findCrossedRoadWithStartAndEndPoits();
            if (crossedRoad) {
                this.deleteRoad(crossedRoad);
            }
        }
    }

    // findCrossedRoadWithSpritesNotUSED() {
    //     const createLineFromSegment = (segment: Phaser.GameObjects.Sprite) => {
    //         const bounds = segment.getBounds();
    //         return new Phaser.Geom.Line(bounds.x, bounds.y, bounds.right, bounds.bottom);
    //     }
        
    //     const line = new Phaser.Geom.Line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
    //     //this.drawDebugLine(line, 0xff0000); // Draw the mouse line in red

    //     for (let road of this.roadManager.getAllRoads()) {
    //         for (let segment of road.getSegments()) {
    //             const segmentLine = createLineFromSegment(segment);
    //             //this.drawDebugLine(segmentLine, 0x0000ff); // Draw each segment line in blue

    //             if (Phaser.Geom.Intersects.LineToLine(line, segmentLine)) {
    //                 return road;
    //             }
    //         }
    //     }
        
    //     return null;
    // }

    findCrossedRoadWithStartAndEndPoits() {
        if (this.startPoint && this.endPoint) {
            const mouseLine = new Phaser.Geom.Line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
            //this.drawDebugLine(mouseLine, 0xff0000); // Draw the mouse line in red

            for (let road of this.roadManager.getAllRoads()) {
                if (road.startCastle && road.endCastle) {
                    const startCastleConnectionPoint = this.roadManager.getConnectionPoint(road.startCastle);
                    const endCastleConnectionPoint = this.roadManager.getConnectionPoint(road.endCastle);
                    const roadLine = new Phaser.Geom.Line(
                        startCastleConnectionPoint.x, 
                        startCastleConnectionPoint.y, 
                        endCastleConnectionPoint.x, 
                        endCastleConnectionPoint.y
                    );
                    //this.drawDebugLine(roadLine, 0x0000ff); // Draw the road line in blue

                    if (Phaser.Geom.Intersects.LineToLine(mouseLine, roadLine)) {
                        return road;
                    }
                }
            }
            return null;
        }
        
    }

    drawDebugLine(line: Phaser.Geom.Line, color: number) {
        this.graphics.lineStyle(2, color, 1);
        this.graphics.strokeLineShape(line);
    }

    clearDebugLines() {
        this.graphics.clear();
    }


    deleteRoad(road: RoadBetweenCastlesInterface) {
        this.roadManager.deleteRoad(road);
    }
}
