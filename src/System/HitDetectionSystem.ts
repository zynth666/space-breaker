import { World } from "@dimforge/rapier3d";
import BallCollider from "../component/BallCollider";
import Breakable from "../component/Breakable";
import CuboidCollider from "../component/CuboidCollider";
import Hit from "../component/Hit";
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

                const entity1 = this.getEntityByColliderHandle(handle1);
                const entity2 = this.getEntityByColliderHandle(handle2);

                this.setHitOnEntity(entity1, entity2);
                this.setHitOnEntity(entity2, entity1);

                this.removeEntityIfBreakable(entity1, world, scene);
                this.removeEntityIfBreakable(entity2, world, scene);
            });
        });
    }

    private getEntityByColliderHandle(handle: number): Entity {
        for (let [entity, container] of this.engine.getEntities()) {
            if (container.has(CuboidCollider)) {
                const collider = container.get(CuboidCollider).value;

                if (collider.handle === handle) {
                    return entity;
                }
            } else if (container.has(BallCollider)) {
                const collider = container.get(BallCollider).value;

                if (collider.handle === handle) {
                    return entity;
                }
            }
        }

        return -1;
    }

    private setHitOnEntity(entity: Entity, hitEntity: Entity): void {
        if (entity === -1) {
            return;
        }

        const components = this.engine.getComponents(entity);
        if (!components.has(Hit)) {
            return;
        }

        const hit = components.get(Hit);
        hit.value = true;
        hit.lastHitEntity = hitEntity;
    }

    private removeEntityIfBreakable(entity: Entity, world: World, scene: THREE.Scene): void {
        if (entity === -1) {
            return;
        }

        const components = this.engine.getComponents(entity);
        if (!components.has(Breakable)) {
            return;
        }

        world.removeCollider(components.get(CuboidCollider).value, true);
        scene.remove(components.get(Mesh).three);
        this.engine.removeEntity(entity);
    }
} 
