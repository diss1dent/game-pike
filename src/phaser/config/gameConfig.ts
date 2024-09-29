export const gameConfig: { 
    castleMaxLevel: number, 
    castleGrowthTime: number, 
    playerId: string,
    owners: string[],
    ownerColors: { [key: string]: number }; 
} = {
    castleMaxLevel: 100,
    castleGrowthTime: 1000,
    playerId: '',
    owners: [], // Initialized as an empty array of strings
    ownerColors: {}, // Initialized as an empty array of strings
};

export const gameDesign = {
    roadWidth: 12,
    roadHeight: 12,
    unitWariorWidth: 175,
    unitWariorHeight: 175
};

export const EVENTS = {
    unitArrived: 'unitArrived'
};

export default gameConfig;
