import BallCollider from "../component/BallCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import Mesh from "../component/Mesh";
import Position from "../component/Position";
import { Entity } from "../entity/types";
import System from "./System";

export default class AttachedBallMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, DynamicRigidBody, BallCollider, Position, Fireable]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(DynamicRigidBody);
            const mesh = entityContainer.get(Mesh).three;
            const paddle = mesh.parent;
            const position = entityContainer.get(Position);

            rigidBody.value.setTranslation(position.value.set(paddle.position.x, paddle.position.y, paddle.position.z - 1.3), true);
        });
    }
}
