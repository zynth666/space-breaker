import Hit from "../component/Hit";
import LoseGameDetector from "../component/LoseGameDetector";
import SensorCollider from "../component/SensorCollider";
import { Entity } from "../entity/types";
import System from "./System";
import loseSoundUrl from "../assets/audio/you-lose-game.wav";

export default class LoseGameSystem extends System {
    public requiredComponents = new Set<Function>([SensorCollider, Hit]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const hit = entityContainer.get(Hit);

            if (!hit.value) {
                return;
            }

            const allEntities = this.engine.getEntities();

            for (let [entity, container] of allEntities) {
                if (container.has(LoseGameDetector)) {
                    container.get(LoseGameDetector).value = true;
                }
            }

            const loseSound = new Audio(loseSoundUrl);
            loseSound.play();

            this.engine.removeSystem(this);
        });
    }
}
