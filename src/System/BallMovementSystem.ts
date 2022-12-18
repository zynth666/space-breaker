import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import Mesh from "../component/Mesh";
import { Entity } from "../entity/types";
import System from "./System";

export default class BallMovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, KinematicPositionBasedRigidBody, BallCollider]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const rigidBody = entityContainer.get(KinematicPositionBasedRigidBody);
            const mesh = entityContainer.get(Mesh).three.parent;

            rigidBody.value.setNextKinematicTranslation(new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z - 1.3));
        });
    }
}
