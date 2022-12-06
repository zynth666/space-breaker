import * as THREE from "three";
import Action from "../component/Action";
import ComponentContainer from "../component/ComponentContainer";
import Direction from "../component/Direction";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import Engine from "../engine/Engine";

export default class BallInitializer {
    public static create(engine: Engine): Mesh {
        const ballGeometry = new THREE.SphereGeometry(0.75);
        const ballMaterial = new THREE.MeshNormalMaterial();
        const ball = new Mesh(ballGeometry, ballMaterial);
        ball.three.position.set(0, 0, -1.25);

        const ballEntity = engine.addEntity();
        engine.addComponent(ballEntity, ball);
        const ballDirection = new Direction();
        const ballVelocity = new Velocity(0.5);

        const launchBall = (entity: ComponentContainer) => {
            const direction = entity.get(Direction);
            direction.vec.setZ(-1);
            direction.vec.setX(Math.random() * 2 - 1);
        };

        const ballController = new Action({ " ": launchBall });
        engine.addComponent(ballEntity, ballDirection);
        engine.addComponent(ballEntity, ballVelocity);
        engine.addComponent(ballEntity, ballController);

        return ball;
    }
}
