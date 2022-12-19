import * as THREE from "three";
import CharacterController from "../component/CharacterController";
import CuboidCollider from "../component/CuboidCollider";
import GLTFModel from "../component/GLTFModel";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import { Mesh } from "three";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class CharacterMovementSystem extends System {
    public requiredComponents = new Set<Function>([GLTFModel, KinematicPositionBasedRigidBody, CharacterController, CuboidCollider, Position]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(KinematicPositionBasedRigidBody);
            const mesh = entityContainer.get(GLTFModel).three.scene.getObjectByName("Scene") as Mesh;

            if (!entityContainer.has(Velocity)) {
                rigidBody.value.setLinvel(new THREE.Vector3(), true);
                mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
                return;
            }

            const velocity = entityContainer.get(Velocity);
            const characterController = entityContainer.get(CharacterController);
            const collider = entityContainer.get(CuboidCollider);
            const position = entityContainer.get(Position);

            characterController.value.computeColliderMovement(collider.value, velocity.vec);
            const correctedMovement = characterController.value.computedMovement();
            const correctedMovementVector = new THREE.Vector3(correctedMovement.x, correctedMovement.y, correctedMovement.z);
            rigidBody.value.setNextKinematicTranslation(position.value.add(correctedMovementVector));
            mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
        });
    }
}
