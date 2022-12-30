import Controller from "../component/Controller";
import Sound from "../component/Sound";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class CharacterSoundSystem extends System {
    public requiredComponents = new Set<Function>([Sound, Controller]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const sound = entityContainer.get(Sound);

            if (!entityContainer.has(Velocity)) {
                sound.value.pause();
                return;
            } else {
                sound.value.play();
            }
        });
    }
}
