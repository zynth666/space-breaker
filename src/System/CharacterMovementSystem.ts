import * as THREE from "three";
import CharacterController from "../component/CharacterController";
import CuboidCollider from "../component/CuboidCollider";
import KinematicVelocityBasedRigidBody from "../component/KinematicVelocityBasedRigidBody";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class CharacterMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, Velocity, KinematicVelocityBasedRigidBody, CharacterController, CuboidCollider]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const mesh = entityContainer.get(Mesh);
            const velocity = entityContainer.get(Velocity);
            const rigidBody = entityContainer.get(KinematicVelocityBasedRigidBody);
            const characterController = entityContainer.get(CharacterController);
            const collider = entityContainer.get(CuboidCollider);

            characterController.value.computeColliderMovement(collider.value, velocity.vec);
            const correctedMovement = characterController.value.computedMovement();

            rigidBody.value.setLinvel(correctedMovement, true);
            const correctedMovementVector = new THREE.Vector3().set(correctedMovement.x, correctedMovement.y, correctedMovement.z);
            const distance = correctedMovementVector.length();
            const axis = correctedMovementVector.normalize();
            mesh.three.translateOnAxis(axis, distance);
        });
    }
}
