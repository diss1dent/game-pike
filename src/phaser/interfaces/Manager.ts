import { CastleInterface } from "./Castle";

export interface EntityManagerInterface<T> {
    add(entity: T): void;
    remove(entity: T): void;
    getAll(): T[];
}

export interface CastleManagerInterface extends EntityManagerInterface<CastleInterface> {
    findClosestCastleWithOwners(computerCastle: CastleInterface, owners: string[]): CastleInterface | null;
    updateCastleLevels(): void;
}