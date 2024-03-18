interface PhaserStore {
    game: Phaser.Game | null;
}

const phaserStore:PhaserStore = {
    game: null
}

export {phaserStore}