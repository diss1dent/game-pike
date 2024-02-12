export const DEPTH = {
    castle: 1000,
    road: 500,
    roadArrow: 510,
    unit: 700,
}

export const enum OWNER {
    neutral = 'neutral',
    player = 'player',
    computer = 'computer',
}

export const CASTLES_THAT_GROWS = [
    OWNER.player,
    OWNER.computer
]

export const GAME_LEVEL = {
    level1: "level1",
    level2: "level2"
}


export const enum UNIT_TYPES {
    warrior = 'warrior'
}

export const DIRECTIONS = {
    EAST: 'e',
    NORTH_EAST: 'ne',
    NORTH: 'n',
    NORTH_WEST: 'nw',
    WEST: 'w',
    SOUTH_WEST: 'sw',
    SOUTH: 's',
    SOUTH_EAST: 'se'
};