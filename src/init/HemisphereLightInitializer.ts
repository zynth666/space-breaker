import { HemisphereLightHelper } from "three";
import HemisphereLight from "../component/HemisphereLight";
import Engine from "../engine/Engine";
import { Entity } from "../entity/types";

export default class HemisphereLightInitializer {
    public static create(engine: Engine, scene: THREE.Scene): Entity {
        const hemiLight = new HemisphereLight(0xd3c4f2, 0xffffff, 1);
        hemiLight.three.position.set(0, 20, 0);
        scene.add(hemiLight.three);

        const helper = new HemisphereLightHelper(hemiLight.three, 5);
        scene.add(helper);
        const hemiLightEntity = engine.addEntity();
        engine.addComponent(hemiLightEntity, hemiLight);

        return hemiLightEntity;
    }
}
