import * as THREE from "three";
import HemisphereLight from "../component/HemisphereLight";

export default class HemisphereLightInitializer {
    public static create<T extends HemisphereLight>(c: new (skyColor?: THREE.ColorRepresentation, groundColor?: THREE.ColorRepresentation, intensity?: number) => T): T {
        const hemiLight = new c(0xffffff, 0xffffff, 0.1);
        hemiLight.three.color.setHSL(0.7, 0.7, 0.7);
        hemiLight.three.groundColor.setHSL(0.1, 1, 0.4);
        hemiLight.three.position.set(0, 50, 0);

        return hemiLight;
    }
}
