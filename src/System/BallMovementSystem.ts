import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import CuboidCollider from "../component/CuboidCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import GLTFModel from "../component/GLTFModel";
import Hit from "../component/Hit";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class BallMovementSystem extends System {
    public requiredComponents = new Set<Function>([GLTFModel, DynamicRigidBody, BallCollider, Position, Velocity, Hit]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(DynamicRigidBody);
            const mesh = entityContainer.get(GLTFModel).three.scene;
            mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
            mesh.rotation.set(rigidBody.value.rotation().x, rigidBody.value.rotation().y, rigidBody.value.rotation().z);

            const linvelVector = new THREE.Vector3(rigidBody.value.linvel().x, rigidBody.value.linvel().y, rigidBody.value.linvel().z);
            if (linvelVector.length() > 17.5) {
                rigidBody.value.setLinvel(linvelVector.normalize().multiplyScalar(17.5), true);
            }

            if (linvelVector.length() < 10) {
                rigidBody.value.setLinvel(linvelVector.normalize().multiplyScalar(10), true);
            }

            const hit = entityContainer.get(Hit);
            if (!hit.value) {
                return;
            }

            if (hit.lastHitEntity === -1) {
                return;
            }

            const lastHitEntityContainer = this.engine.getComponents(hit.lastHitEntity);
            if (!lastHitEntityContainer.has(KinematicPositionBasedRigidBody)) {
                return;
            }

            const ballPosition = rigidBody.value.translation();
            const ballPositionVector = new THREE.Vector3(ballPosition.x, ballPosition.y, ballPosition.z);
            const lastHitEntityPosition = lastHitEntityContainer.get(KinematicPositionBasedRigidBody).value.translation();
            const lastHitEntityPositionVector = new THREE.Vector3(lastHitEntityPosition.x, lastHitEntityPosition.y, lastHitEntityPosition.z);

            const direction = new THREE.Vector3().subVectors(ballPositionVector, lastHitEntityPositionVector).normalize();
            direction.y = 0;
            const ballLinvel = rigidBody.value.linvel();
            const velocity = new THREE.Vector3(ballLinvel.x, ballLinvel.y, ballLinvel.z);
            const velocityLength = velocity.length();
            const normalizedVelocity = velocity.normalize();

            direction.multiplyScalar(0.9);
            normalizedVelocity.multiplyScalar(0.1);

            direction.add(normalizedVelocity).normalize().multiplyScalar(velocityLength);
            rigidBody.value.setLinvel(direction, true);
        });
    }
}
