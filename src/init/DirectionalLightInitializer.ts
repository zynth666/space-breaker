import * as THREE from "three";
import DirectionalLight from "../component/DirectionalLight";

export default class DirectionalLightInitializer {
    public static create(scene: THREE.Scene) {
        const light = new DirectionalLight(0xffffff, 1);
        light.three.position.set(-15, 10, -15);

        scene.add(light.three);

        const lightHelper = new THREE.DirectionalLightHelper(light.three, 5);
        scene.add(lightHelper);
    }
}
