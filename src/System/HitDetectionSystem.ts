import CuboidCollider from "../component/CuboidCollider";
import Mesh from "../component/Mesh";
import PhysicsWorld from "../component/PhysicsWorld";
import RapierEventQueue from "../component/RapierEventQueue";
import Scene from "../component/Scene";
import { Entity } from "../entity/types";
import System from "./System";

export default class HitDetectionSystem extends System {
    public requiredComponents = new Set<Function>([RapierEventQueue, Scene, PhysicsWorld]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const eventQueue = entityContainer.get(RapierEventQueue).value;
            const world = entityContainer.get(PhysicsWorld).value;
            const scene = entityContainer.get(Scene).three;

            eventQueue.drainCollisionEvents((handle1, handle2, started) => {
                if (started) {
                    return;
                }

                const hitEntity = this.getEntityByColliderHandle(handle2);

                if (hitEntity === -1) {
                    return;
                }

                const components = this.engine.getComponents(hitEntity);
                world.removeCollider(components.get(CuboidCollider).value, true);
                scene.remove(components.get(Mesh).three);
                this.engine.removeEntity(hitEntity);
            });
        });
    }

    public getEntityByColliderHandle(handle: number): Entity {
        for (let [entity, container] of this.engine.getEntities()) {
            if (container.has(CuboidCollider)) {
                const collider = container.get(CuboidCollider).value;
                if (collider.handle === handle) {
                    return entity;
                }
            }
        }

        return -1;
    }
} 
