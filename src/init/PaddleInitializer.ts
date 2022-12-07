import * as THREE from "three";
import Controller from "../component/Controller";
import Direction from "../component/Direction";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import Engine from "../engine/Engine";

export default class PaddleInitializer {
    public static create(engine: Engine): Mesh {
        const paddleGeometry = new THREE.BoxGeometry(5, 1, 1);
        const paddleMaterial = new THREE.MeshPhongMaterial({ color: 0x0c0c0c });
        const paddle = new Mesh(paddleGeometry, paddleMaterial);
        paddle.three.position.set(0, 0, 15);

        const paddleEntity = engine.addEntity();
        engine.addComponent(paddleEntity, paddle);
        const paddleDirection = new Direction();
        const paddleVelocity = new Velocity(0.5);
        const paddleController = new Controller({ "ArrowLeft": "left", "ArrowRight": "right" });
        engine.addComponent(paddleEntity, paddleDirection);
        engine.addComponent(paddleEntity, paddleVelocity);
        engine.addComponent(paddleEntity, paddleController);
        return paddle;
    }
}