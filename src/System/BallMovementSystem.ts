import BallCollider from "../component/BallCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Mesh from "../component/Mesh";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class BallMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, DynamicRigidBody, BallCollider, Position, Velocity]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(DynamicRigidBody);
            const mesh = entityContainer.get(Mesh).three;
            mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
        });
    }
}
