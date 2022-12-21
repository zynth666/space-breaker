import * as THREE from "three";
import Camera from "../component/Camera";

export default class CameraInitializer {
    public static create(): Camera {
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 5000);
        camera.position.set(0, 40, 40);
        camera.lookAt(new THREE.Vector3(0, 0, 5));
        return new Camera(camera);
    }
}
