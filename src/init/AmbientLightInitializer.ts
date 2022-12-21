import * as THREE from 'three';

export default class AmbientLightInitializer {
    public static create(scene: THREE.Scene) {
        const light = new THREE.AmbientLight(0xffffff, 0.1);
        scene.add(light);
    }
}
