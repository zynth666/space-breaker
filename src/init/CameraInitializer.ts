import * as THREE from "three";
import Camera from "../component/Camera";

export default class CameraInitializer {
    public static create<T extends Camera>(c: new (cam: THREE.PerspectiveCamera) => T): T {
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 5000);
        camera.position.set(0, 30, 40);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        return new c(camera);
    }
}
