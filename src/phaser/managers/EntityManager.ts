export class EntityManager<T> {
    private entities: T[] = [];

    constructor() {}

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

    // Todo
    // - Finding entities by properties
    // - Filtering entities based on conditions
    // - Updating entities in bulk
}
