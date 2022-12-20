import * as THREE from "three";
import Engine from "../engine/Engine";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

export default class RectangularLightInitializer {
    public static create(engine: Engine, scene: THREE.Scene) {
        RectAreaLightUniformsLib.init();

        const width = 50;
        const height = 30;
        const intensity = 1;

        const rectLight = this.createRectLight(width - 10, height, intensity, 0xffffff, new THREE.Vector3(0, 5, -25), Math.PI);
        scene.add(rectLight);

        const rectLight2 = this.createRectLight(width, height, intensity, 0xffffff, new THREE.Vector3(20, 5, 0), Math.PI / 2);
        scene.add(rectLight2);

        const rectLight3 = this.createRectLight(width, height, intensity, 0xffffff, new THREE.Vector3(-20, 5, 0), -Math.PI / 2);
        scene.add(rectLight3);
    }

    private static createRectLight(width: number, height: number, intensity: number, color: number, position: THREE.Vector3, rotation: number) {
        const rectLight = new THREE.RectAreaLight(color, intensity, width, height);
        rectLight.position.copy(position);
        rectLight.rotateY(rotation);
        const rectLightHelper = new RectAreaLightHelper(rectLight);
        rectLight.add(rectLightHelper);
        return rectLight;
    }
}
