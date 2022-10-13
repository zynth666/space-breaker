import ComponentContainer from "../Component/ComponentContainer";
import { Entity } from "../Entity/types";
import System from "../System/System";

export default class Engine {
    private entities = new Map<Entity, ComponentContainer>()
    private systems = new Map<System, Set<Entity>>()

    private nextEntityID = 0
    private entitiesToDestroy = new Array<Entity>()

    public addEntity(): Entity {
        let entity = this.nextEntityID;
        this.nextEntityID++;
        this.entities.set(entity, new ComponentContainer());
        return entity;
    }

    public removeEntity(entity: Entity): void {
        this.entitiesToDestroy.push(entity);
    }

    public addComponent(entity: Entity, component: Component): void {
        this.entities.get(entity).add(component);
        this.checkE(entity);
    }

    public getComponents(entity: Entity): ComponentContainer {
        return this.entities.get(entity);
    }

    public removeComponent(
        entity: Entity, componentClass: Function
    ): void {
        this.entities.get(entity).delete(componentClass);
        this.checkE(entity);
    }

    public addSystem(system: System): void {
        if (system.requiredComponents.size == 0) {
            console.warn("System not added: empty Components list.");
            console.warn(system);
            return;
        }

        system.ecs = this;

        this.systems.set(system, new Set());
        for (let entity of this.entities.keys()) {
            this.checkES(entity, system);
        }
    }

    public update(): void {
        for (let [system, entities] of this.systems.entries()) {
            system.update(entities)
        }

        while (this.entitiesToDestroy.length > 0) {
            this.destroyEntity(this.entitiesToDestroy.pop());
        }
    }

    private destroyEntity(entity: Entity): void {
        this.entities.delete(entity);
        for (let entities of this.systems.values()) {
            entities.delete(entity);  // no-op if doesn't have it
        }
    }

    private checkE(entity: Entity): void {
        for (let system of this.systems.keys()) {
            this.checkES(entity, system);
        }
    }

    private checkES(entity: Entity, system: System): void {
        let have = this.entities.get(entity);
        let need = system.requiredComponents;

        if (have.hasAll(need)) {
            this.systems.get(system).add(entity);
        } else {
            this.systems.get(system).delete(entity);
        }
    }
}