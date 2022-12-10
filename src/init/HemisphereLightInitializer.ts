import HemisphereLight from "../component/HemisphereLight";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";

export default class HemisphereLightInitializer {
    public static create(engine: Engine, scene: THREE.Scene): Entity {
        const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.1);
        hemiLight.three.color.setHSL(0.7, 0.7, 0.7);
        hemiLight.three.groundColor.setHSL(0.1, 1, 0.4);
        hemiLight.three.position.set(0, 50, 0);
        scene.add(hemiLight.three);

        const hemiLightEntity = engine.addEntity();
        engine.addComponent(hemiLightEntity, hemiLight);

        return hemiLightEntity;
    }
}
