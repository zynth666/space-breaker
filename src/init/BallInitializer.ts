import RAPIER, { World } from "@dimforge/rapier3d";
import * as THREE from "three";
import BallCollider from "../component/BallCollider";
import CharacterController from "../component/CharacterController";
import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import KinematicPositionBasedRigidBody from "../component/KinematicPositionBasedRigidBody";
import Mesh from "../component/Mesh";
import ParentEntity from "../component/ParentEntity";
import Position from "../component/Position";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";
import { TripleTuple } from "../types";

export default class BallInitializer {
    public static create(engine: Engine, paddle: Entity, world: World): Entity {
        const ball = engine.addEntity();
        const paddleContainer = engine.getComponents(paddle);
        const paddleScene = paddleContainer.get(Mesh).three;
        const offset = paddleScene.position.z;
        const positionVector = new THREE.Vector3(0, 0, -1.3);

        const positionOffset: TripleTuple<number> = [0, 0, offset - 1.3];
        const positionVectorWithOffset = new THREE.Vector3(...positionOffset);

        const geometry = new THREE.SphereGeometry(0.75);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new Mesh(geometry, material);
        mesh.three.position.copy(positionVector);
        engine.addComponent(ball, mesh);

        const ballFireable = new Fireable();
        engine.addComponent(ball, ballFireable);

        const position = new Position(...positionOffset);
        engine.addComponent(ball, position);

        const rigidBody = new DynamicRigidBody(world);
        rigidBody.value.setNextKinematicTranslation(positionVectorWithOffset);
        rigidBody.value.lockTranslations(true, true);
        rigidBody.value.setEnabledTranslations(true, false, true, true);
        engine.addComponent(ball, rigidBody);

        const collider = new BallCollider(0.75, world, rigidBody.value);
        collider.value.setRestitution(1.0);
        collider.value.setRestitutionCombineRule(RAPIER.CoefficientCombineRule.Max);
        collider.value.setFriction(-0.01);
        collider.value.setFrictionCombineRule(RAPIER.CoefficientCombineRule.Min);
        engine.addComponent(ball, collider);

        const characterController = new CharacterController(world);
        engine.addComponent(ball, characterController);

        const parentEntity = new ParentEntity(paddle);
        engine.addComponent(ball, parentEntity);

        paddleScene.add(mesh.three);

        return ball;
    }
}
