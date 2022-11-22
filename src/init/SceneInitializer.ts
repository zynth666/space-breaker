import * as THREE from "three";
import Scene from "../component/Scene";
import skyRight from "../assets/images/corona_rt.png";
import skyLeft from "../assets/images/corona_lf.png";
import skyUp from "../assets/images/corona_up.png";
import skyDown from "../assets/images/corona_dn.png";
import skyFront from "../assets/images/corona_ft.png";
import skyBack from "../assets/images/corona_bk.png";

type SceneComponentType<T> = new (scene: THREE.Scene) => T;

export default class SceneInitializer {
    public static create<T extends Scene>(c: SceneComponentType<T>): T {
        const scene = new THREE.Scene();
        try {
            const loader = new THREE.CubeTextureLoader();
            const texture = loader.load([
                skyLeft,
                skyRight,
                skyUp,
                skyDown,
                skyFront,
                skyBack,
            ]);
            scene.background = texture;
            scene.background.encoding = THREE.sRGBEncoding;

            return new c(scene);
        } catch (error) {
            console.error(error);
        }
    }
}
