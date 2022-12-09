import * as THREE from "three";
import Fireable from "../component/Fireable";
import Force from "../component/Force";
import Mesh from "../component/Mesh";
import Engine from "../engine/Engine";

export default class BallInitializer {
    public static create(engine: Engine): Mesh {
        const ballGeometry = new THREE.SphereGeometry(0.75);
        const ballMaterial = new THREE.MeshNormalMaterial();
        const ball = new Mesh(ballGeometry, ballMaterial);
        ball.three.position.set(0, 0, -1.25);

        const ballEntity = engine.addEntity();
        engine.addComponent(ballEntity, ball);

        const ballFireable = new Fireable();
        engine.addComponent(ballEntity, ballFireable);

        const ballForce = new Force(0.5);
        engine.addComponent(ballEntity, ballForce);

        return ball;
    }
}
