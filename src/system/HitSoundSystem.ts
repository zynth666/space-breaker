import Hit from "../component/Hit";
import Sound from "../component/Sound";
import { Entity } from "../entity/types";
import System from "./System";

export default class HitSoundSystem extends System {
    public requiredComponents = new Set<Function>([Hit, Sound]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const hit = entityContainer.get(Hit);
            const sound = entityContainer.get(Sound);

            if (!hit.value) {
                return;
            }

            sound.value.play();
            hit.value = false;
        });
    }
}
