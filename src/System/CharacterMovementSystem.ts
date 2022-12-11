import KinematicVelocityBasedRigidBody from "../component/KinematicVelocityBasedRigidBody";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class CharacterMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, Velocity, KinematicVelocityBasedRigidBody]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const mesh = entityContainer.get(Mesh);
            const velocity = entityContainer.get(Velocity);
            const rigidBody = entityContainer.get(KinematicVelocityBasedRigidBody);


            /* const distance = velocity.vec.length() * force.value;
            const axis = velocity.vec.normalize();
            mesh.three.translateOnAxis(axis, distance); */
        });
    }
}
