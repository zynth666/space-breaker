import * as THREE from "three";
import DirectionalLight from "../component/DirectionalLight";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";

export default class DirectionalLightInitializer {
    public static create(engine: Engine, scene: THREE.Scene) {
        const backLight = new DirectionalLight(0xffffff, 1);
        backLight.three.position.set(-5, 20, -20);
        backLight.three.target.position.set(0, 0, -10);

        scene.add(backLight.three);

        const backLightHelper = new THREE.DirectionalLightHelper(backLight.three, 5);
        scene.add(backLightHelper);

        const backLightEntity = engine.addEntity();
        engine.addComponent(backLightEntity, backLight);

        const frontLight = new DirectionalLight(0xffffff, 1);
        frontLight.three.position.set(5, 10, 40);

        scene.add(frontLight.three);

        const frontLightHelper = new THREE.DirectionalLightHelper(frontLight.three, 5);
        scene.add(frontLightHelper);

        const frontLightEntity = engine.addEntity();
        engine.addComponent(frontLightEntity, frontLight);
    }
}
