import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import CuboidCollider from "../component/CuboidCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import GLTFModel from "../component/GLTFModel";
import Hit from "../component/Hit";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import LoseGameDetector from "../component/LoseGameDetector";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import WinGameDetector from "../component/WinGameDetector";
import { Entity } from "../entity/types";
import System from "./System";

export default class BallMovementSystem extends System {
    public requiredComponents = new Set<Function>([GLTFModel, DynamicRigidBody, BallCollider, Position, Velocity, Hit, WinGameDetector, LoseGameDetector]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const collider = entityContainer.get(BallCollider);

            const winGameDetector = entityContainer.get(WinGameDetector);
            const loseGameDetector = entityContainer.get(LoseGameDetector);
            const mesh = entityContainer.get(GLTFModel).three.scene;
            const rigidBody = entityContainer.get(DynamicRigidBody);

            if (winGameDetector.value || loseGameDetector.value) {
                mesh.parent.remove(mesh);
                rigidBody.destroy();
                collider.destroy();
                this.engine.removeEntity(entity);
                return;
            }

            this.setMeshTranslations(mesh, rigidBody);

            this.clampLinvel(rigidBody);

            const hit = entityContainer.get(Hit);
            this.determineNewBallDirection(hit, rigidBody);
        });
    }

    private clampLinvel(rigidBody: DynamicRigidBody): void {
        const linvelVector = new THREE.Vector3(rigidBody.value.linvel().x, rigidBody.value.linvel().y, rigidBody.value.linvel().z);
        if (linvelVector.length() > 17.5) {
            rigidBody.value.setLinvel(linvelVector.normalize().multiplyScalar(17.5), true);
        }

        if (linvelVector.length() < 10) {
            rigidBody.value.setLinvel(linvelVector.normalize().multiplyScalar(10), true);
        }
    }

    private setMeshTranslations(mesh: THREE.Group, rigidBody: DynamicRigidBody): void {
        mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
        mesh.rotation.set(rigidBody.value.rotation().x, rigidBody.value.rotation().y, rigidBody.value.rotation().z);
    }

    private determineNewBallDirection(hit: Hit, rigidBody: DynamicRigidBody) {
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
    }
}
