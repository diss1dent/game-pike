interface Identifiable {
    id: number;
}

export class EntityManager<T extends Identifiable> {
    private entities: T[] = [];

    constructor() {
        this.entities = [];
    }

    add(entity: T): void {
        this.entities.push(entity);
    }

    remove(entity: T): void {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
        }
    }

    getAll(): T[] {
        return this.entities;
    }

    getById(id: number): T | undefined {
        return this.entities.find(entity => entity.id === id);
    }

    reset() {
        this.deleteAll();
    }

    deleteAll(): void {
        this.entities = [];
    }
}
