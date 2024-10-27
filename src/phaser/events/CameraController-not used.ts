export default class CameraController {
    private scene: Phaser.Scene;
    private isDragging: boolean = false;
    private dragStartX: number = 0;
    private dragStartY: number = 0;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.initCameraControls();
    }

    private initCameraControls() {
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            this.isDragging = true;
            this.dragStartX = pointer.x + this.scene.cameras.main.scrollX;
            this.dragStartY = pointer.y + this.scene.cameras.main.scrollY;
        });

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            if (this.isDragging) {
                this.scene.cameras.main.scrollX = this.dragStartX - pointer.x;
                this.scene.cameras.main.scrollY = this.dragStartY - pointer.y;
            }
    
            // touch support
            if (pointer.isDown) {
                this.scene.cameras.main.scrollX -= pointer.velocity.x / 10;
                this.scene.cameras.main.scrollY -= pointer.velocity.y / 10;
            }
        });

        this.scene.input.on('pointerup', () => {
            this.isDragging = false;
        });
    }
}
