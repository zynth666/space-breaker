import { World } from "@dimforge/rapier3d";
import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import Mesh from "../component/Mesh";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";

export default class BallInitializer {
    public static create(engine: Engine, paddle: Entity, world: World): Entity {
        const ball = engine.addEntity();
        const paddleContainer = engine.getComponents(paddle);
        const paddleScene = paddleContainer.get(Mesh).three;
        const offset = paddleScene.position.z;
        const positionVector = new THREE.Vector3(0, 0, -1.3);
        const positionVectorWithOffset = new THREE.Vector3(0, 0, offset - 1.3);

        const geometry = new THREE.SphereGeometry(0.75);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new Mesh(geometry, material);
        mesh.three.position.copy(positionVector);
        engine.addComponent(ball, mesh);

        const ballFireable = new Fireable();
        engine.addComponent(ball, ballFireable);

        const rigidBody = new KinematicPositionBasedRigidBody(world);
        rigidBody.value.setNextKinematicTranslation(positionVectorWithOffset);
        engine.addComponent(ball, rigidBody);

        const collider = new BallCollider(0.75, world, rigidBody.value);
        engine.addComponent(ball, collider);

        paddleScene.add(mesh.three);

        return ball;
    }
}
