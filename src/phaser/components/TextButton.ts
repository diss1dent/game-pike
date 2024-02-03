import { blueButtonStyle } from "../config/phaserUI";

export default class TextButton extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string | string[], onClick: Function, buttonStyle = blueButtonStyle) {
        super(scene, x, y, text, buttonStyle);

        this.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15)
        this.setOrigin(0.5);
        this.setPadding(50, 20, 50, 20);
        this.setInteractive({ useHandCursor: true });

        this.on('pointerover', () => this.setShadow(5, 10, 'rgba(0,0,0,0.7)', 15));
        this.on('pointerout', () => this.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15));
        this.on('pointerdown', onClick);

        scene.add.existing(this);
    }
}