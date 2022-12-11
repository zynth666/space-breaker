import * as THREE from "three";
import Controller from "../component/Controller";
import Force from "../component/Force";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import Engine from "../engine/Engine";
import KinematicVelocityBasedRigidBody from "../component/KinematicVelocityBasedRigidBody";
import { Entity } from "../entity/types";
import CharacterController from "../component/CharacterController";
import { World } from "@dimforge/rapier3d";
import type { TripleTuple } from "../types";

export default class PaddleInitializer {
    public static create(engine: Engine, scene: THREE.Scene, world: World): Entity {
        const dimensions: TripleTuple<number> = [5, 1, 1];
        const paddleGeometry = new THREE.BoxGeometry(...dimensions);
        const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0x0c0c0c });
        const paddle = new Mesh(paddleGeometry, paddleMaterial);

        const position: TripleTuple<number> = [0, 0, 15];
        paddle.three.position.set(...position);
        scene.add(paddle.three);

        const paddleEntity = engine.addEntity();
        const paddleVelocity = new Velocity();
        const paddleForce = new Force(0.5);
        const paddleController = new Controller({ "ArrowLeft": "left", "ArrowRight": "right" });
        const rigidBody = new KinematicVelocityBasedRigidBody(world);
        rigidBody.value.setTranslation(...position);
        const characterController = new CharacterController(world);

        engine.addComponent(paddleEntity, paddle);
        engine.addComponent(paddleEntity, paddleVelocity);
        engine.addComponent(paddleEntity, paddleForce);
        engine.addComponent(paddleEntity, paddleController);
        engine.addComponent(paddleEntity, rigidBody);
        engine.addComponent(paddleEntity, characterController);

        return paddleEntity;
    }
}
