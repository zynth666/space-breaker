import * as THREE from "three";
import DirectionalLight from "../component/DirectionalLight";
import Engine from "../engine/Engine";

export default class DirectionalLightInitializer {
    public static create<T extends DirectionalLight>(c: new (color?: THREE.ColorRepresentation, intensity?: number) => T, engine: Engine): T {
        const dirLight = new c(0xffffff, 10);
        dirLight.three.color.setHSL(0.1, 1, 0.95);
        dirLight.three.position.set(-1, 1.75, 1);
        dirLight.three.position.multiplyScalar(100);

        dirLight.three.castShadow = true;

        dirLight.three.shadow.mapSize.width = 2048;
        dirLight.three.shadow.mapSize.height = 2048;

        let d = 50;

        dirLight.three.shadow.camera.left = -d;
        dirLight.three.shadow.camera.right = d;
        dirLight.three.shadow.camera.top = d;
        dirLight.three.shadow.camera.bottom = -d;

        dirLight.three.shadow.camera.far = 13500;

        const dirLightEntity = engine.addEntity();
        engine.addComponent(dirLightEntity, dirLight);

        return dirLight;
    }
}
