import * as THREE from "three";
import Controller from "../component/Controller";
import Force from "../component/Force";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";

export default class PaddleInitializer {
    public static create(engine: Engine, scene: THREE.Scene): Entity {
        const paddleGeometry = new THREE.BoxGeometry(5, 1, 1);
        const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0x0c0c0c });
        const paddle = new Mesh(paddleGeometry, paddleMaterial);
        paddle.three.position.set(0, 0, 15);
        scene.add(paddle.three);

        const paddleEntity = engine.addEntity();
        engine.addComponent(paddleEntity, paddle);
        const paddleVelocity = new Velocity();
        const paddleForce = new Force(0.5);
        const paddleController = new Controller({ "ArrowLeft": "left", "ArrowRight": "right" });
        engine.addComponent(paddleEntity, paddleVelocity);
        engine.addComponent(paddleEntity, paddleForce);
        engine.addComponent(paddleEntity, paddleController);

        return paddleEntity;
    }
}
