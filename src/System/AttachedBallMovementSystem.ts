import BallCollider from "../component/BallCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import GLTFModel from "../component/GLTFModel";
import Mesh from "../component/Mesh";
import ParentEntity from "../component/ParentEntity";
import Position from "../component/Position";
import { Entity } from "../entity/types";
import System from "./System";

export default class AttachedBallMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, DynamicRigidBody, BallCollider, Position, Fireable, ParentEntity]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(DynamicRigidBody);
            const mesh = entityContainer.get(Mesh).three;
            const playerEntity = entityContainer.get(ParentEntity).value;
            const player = this.engine.getComponents(playerEntity).get(GLTFModel).three.scene;
            const position = entityContainer.get(Position);

            rigidBody.value.setTranslation(position.value.set(player.position.x, player.position.y, player.position.z - 5), true);
            mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
        });
    }
}
