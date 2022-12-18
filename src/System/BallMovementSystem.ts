import { Vector3 } from "@dimforge/rapier3d";
import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import CharacterController from "../component/CharacterController";
import CuboidCollider from "../component/CuboidCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import KinematicVelocityBasedRigidBody from "../component/KinematicVelocityBasedRigidBody";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class BallMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, DynamicRigidBody, BallCollider]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(KinematicVelocityBasedRigidBody);
            const mesh = entityContainer.get(Mesh);

            if (!entityContainer.has(Velocity)) {
                rigidBody.value.setLinvel(new THREE.Vector3(), true);
                mesh.three.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
                return;
            }

            const velocity = entityContainer.get(Velocity);
            const characterController = entityContainer.get(CharacterController);
            const collider = entityContainer.get(CuboidCollider);

            characterController.value.computeColliderMovement(collider.value, new Vector3(velocity.vec.x, velocity.vec.y, velocity.vec.z));
            const correctedMovement = characterController.value.computedMovement();

            rigidBody.value.setLinvel(correctedMovement, true);
            mesh.three.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
        });
    }
}
