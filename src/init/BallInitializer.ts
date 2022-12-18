import * as THREE from "three";
import Fireable from "../component/Fireable";
import Force from "../component/Force";
import Mesh from "../component/Mesh";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";

export default class BallInitializer {
    public static create(engine: Engine, paddle: Entity): Entity {
        const ballGeometry = new THREE.SphereGeometry(0.75);
        const ballMaterial = new THREE.MeshNormalMaterial();
        const ball = new Mesh(ballGeometry, ballMaterial);
        ball.three.position.set(0, 0, -1.3);

        const paddleScene = engine.getComponents(paddle).get(Mesh).three;
        paddleScene.add(ball.three);

        const ballEntity = engine.addEntity();
        engine.addComponent(ballEntity, ball);

        const ballFireable = new Fireable();
        engine.addComponent(ballEntity, ballFireable);

        return ballEntity;
    }
}
