import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import GLTFModel from "../component/GLTFModel";
import Mesh from "../component/Mesh";
import Position from "../component/Position";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class BallMovementSystem extends System {
    public requiredComponents = new Set<Function>([GLTFModel, DynamicRigidBody, BallCollider, Position, Velocity]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(DynamicRigidBody);
            const mesh = entityContainer.get(GLTFModel).three.scene;
            mesh.position.set(rigidBody.value.translation().x, rigidBody.value.translation().y, rigidBody.value.translation().z);
            mesh.rotation.set(rigidBody.value.rotation().x, rigidBody.value.rotation().y, rigidBody.value.rotation().z);
            const linvelVector = new THREE.Vector3(rigidBody.value.linvel().x, rigidBody.value.linvel().y, rigidBody.value.linvel().z);

            if (linvelVector.length() > 20) {
                rigidBody.value.setLinvel(linvelVector.normalize().multiplyScalar(20), true);
            }

            if (linvelVector.length() < 10) {
                rigidBody.value.setLinvel(linvelVector.normalize().multiplyScalar(10), true);
            }
        });
    }
}
