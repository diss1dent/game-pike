import RoadFactory from "../Factories/RoadFactory";
import { OWNER } from "../config/constants";
import gameConfig from "../config/gameConfig";
import { CastleInterface } from "../interfaces/Castle";
import { CastleManagerInterface } from "../interfaces/Manager";
import RoadManager from "../managers/RoadManager";

export class AIHandler {
    lastUpdateTime: number;

    constructor(private scene: Phaser.Scene,
        private castleManager: CastleManagerInterface,
        private roadManager: RoadManager,
        private roadFactory: RoadFactory,
        
    ) {
        this.scene = scene;
        this.castleManager = castleManager;
        this.roadManager = roadManager;
        this.lastUpdateTime = 0;
    }

    update(time: number) {
        // Implement AI decision-making at certain intervals
        if (time - this.lastUpdateTime > gameConfig.castleGrowthTime) { // Every second
            this.captureNeutralCastles();
            this.defendOrExpand();
            this.lastUpdateTime = time;
        }
    }

    private captureNeutralCastles() {
        // 1. For each computer-owned castle, check if it can connect to any neutral castle
        const computerCastles = this.castleManager.getAll().filter(castle => castle.owner === OWNER.computer);
        computerCastles.forEach(computerCastle => {
            // Example: Find the closest neutral castle to connect
            const targetCastle = this.castleManager.findClosestCastleWithOwners(computerCastle, [OWNER.neutral, OWNER.computer]);
            if (targetCastle && this.roadFactory.canBuildRoad(targetCastle)) {
                // Build a road to the target castle if possible
                this.roadManager.addRoadBetweenCastles(computerCastle, targetCastle, OWNER.computer);
            }
        });
    }

    private defendOrExpand() {
        // Here, the AI evaluates whether to focus on defense or expansion based on the current game state
        const computerCastles = this.castleManager.getAll().filter(castle => castle.owner === OWNER.computer);
        computerCastles.forEach(castle => {
            const connectedRoads = this.roadManager.getAllCastleRoads(castle);
            if (connectedRoads.length < castle.level / 30) {
                // This allows for an additional road every 30 levels
                const potentialTargets = this.identifyPotentialTargets(castle);
                if (potentialTargets.length > 0) {
                    // If there are potential targets, decide on the next action based on strategy
                    // For simplicity, let's just connect to the closest target for now
                    this.connectToClosestTarget(castle, potentialTargets);
                }
            }

            // Additional logic could be added here for upgrading castles or other defensive measures
        });
    }

    private identifyPotentialTargets(castle: CastleInterface): CastleInterface[] {
        // Identify potential targets for expansion or defense
        // This could involve finding neutral castles or determining strategic points for defense
        return [];
    }

    private connectToClosestTarget(castle: CastleInterface, targets: CastleInterface[]) {
        // Connect the given castle to the closest target with a new road
        // This is a placeholder; actual implementation would involve calculating distances
        // and checking if a road can be built based on the castle's level and other conditions
    }
}