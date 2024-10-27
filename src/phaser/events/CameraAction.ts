import { MouseAction } from './MouseActionManager';

export default class CameraAction implements MouseAction {
    private isDragging = false;
    private dragStartX = 0;
    private dragStartY = 0;

    constructor(private scene: Phaser.Scene) {}

    priority = 1;

    // Камера всегда активна, если нет других более приоритетных действий
    isActive() {
        return true; 
    }

    onPointerDown(pointer: Phaser.Input.Pointer) {
        this.isDragging = true;
        this.dragStartX = pointer.x + this.scene.cameras.main.scrollX;
        this.dragStartY = pointer.y + this.scene.cameras.main.scrollY;
    }

    onPointerMove(pointer: Phaser.Input.Pointer) {
        if (this.isDragging) {
            this.scene.cameras.main.scrollX = this.dragStartX - pointer.x;
            this.scene.cameras.main.scrollY = this.dragStartY - pointer.y;
        }
    }

    onPointerUp(pointer: Phaser.Input.Pointer) {
        this.isDragging = false;
    }
}
