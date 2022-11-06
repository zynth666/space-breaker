import * as THREE from "three";
import Scene from "../component/Scene";

export default class SceneInitializer {
    public static create<T extends Scene>(c: new (scene: THREE.Scene) => T): T {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xbfd1e5);
        return new c(scene);
    }
}
