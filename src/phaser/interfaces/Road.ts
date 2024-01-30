import { CastleInterface } from "./Castle";

export interface RoadInterface {
    roadWidth: number;
    owner: string;
    startCastle: CastleInterface | null;
    endCastle: CastleInterface | null;
    destroy(): void;
    update(startX: number, startY: number, endX: number, endY: number): void;
    getSegments(): Phaser.GameObjects.Sprite[];
}

export interface RoadBetweenCastlesInterface extends RoadInterface{
    startCastle: CastleInterface;
    endCastle: CastleInterface;
}