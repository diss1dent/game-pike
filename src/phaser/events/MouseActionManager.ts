export interface MouseAction {
    priority: number; // Приоритет события
    onPointerDown: (pointer: Phaser.Input.Pointer) => void;
    onPointerMove: (pointer: Phaser.Input.Pointer) => void;
    onPointerUp: (pointer: Phaser.Input.Pointer) => void;
    isActive: () => boolean; // Условие, при котором событие активно
}

export default class MouseActionManager {
    private actions: MouseAction[] = [];

    constructor(private scene: Phaser.Scene) {
        this.initMouseEvents();
    }

    // Метод для регистрации действий
    registerAction(action: MouseAction) {
        this.actions.push(action);
        // Сортировка по приоритету — чем больше число, тем выше приоритет
        this.actions.sort((a, b) => b.priority - a.priority);
        console.log('Action registered with priority:', action.priority);
    }

    private initMouseEvents() {
        this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            for (const action of this.actions) {
                if (action.isActive()) {
                    action.onPointerDown(pointer);
                    break; // Останавливаем цикл, если нашли активное действие с высоким приоритетом
                }
            }
        });

        this.scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
            for (const action of this.actions) {
                if (action.isActive()) {
                    action.onPointerMove(pointer);
                    break;
                }
            }
        });

        this.scene.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            for (const action of this.actions) {
                if (action.isActive()) {
                    action.onPointerUp(pointer);
                    break;
                }
            }
        });
    }
}
