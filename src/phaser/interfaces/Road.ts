import { CastleInterface } from "./Castle";

export interface RoadInterface {
    owner: string;
    startCastle: CastleInterface | null;
    endCastle: CastleInterface | null;
    getId(): string;
    destroy(): void;
    update(startX: number, startY: number, endX: number, endY: number): void;
    getSegments(): Phaser.GameObjects.Sprite[];
}

export interface RoadBetweenCastlesInterface extends RoadInterface{
    startCastle: CastleInterface;
    endCastle: CastleInterface;
}