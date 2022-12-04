import * as THREE from "three";
import HemisphereLight from "../component/HemisphereLight";
import Engine from "../engine/Engine";

export default class HemisphereLightInitializer {
    public static create<T extends HemisphereLight>(c: new (skyColor?: THREE.ColorRepresentation, groundColor?: THREE.ColorRepresentation, intensity?: number) => T, engine: Engine): T {
        const hemiLight = new c(0xffffff, 0xffffff, 0.1);
        hemiLight.three.color.setHSL(0.7, 0.7, 0.7);
        hemiLight.three.groundColor.setHSL(0.1, 1, 0.4);
        hemiLight.three.position.set(0, 50, 0);

        const hemiLightEntity = engine.addEntity();
        engine.addComponent(hemiLightEntity, hemiLight);

        return hemiLight;
    }
}
