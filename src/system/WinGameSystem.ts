import Breakable from "../component/Breakable";
import WinGameDetector from "../component/WinGameDetector";
import { Entity } from "../entity/types";
import System from "./System";
import winSoundUrl from "../assets/audio/you-win.wav"

export default class WinGameSystem extends System {
    public requiredComponents = new Set<Function>([WinGameDetector]);

    public update(entities: Set<Entity>): void {
        const allEntities = this.engine.getEntities();
        let count = 0;

        for (let [entity, container] of allEntities) {
            if (container.has(Breakable)) {
                count++;
            }
        }

        if (count !== 0) {
            return;
        }

        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const winGameDetector = entityContainer.get(WinGameDetector);

            winGameDetector.value = true;
        });

        const winSound = new Audio(winSoundUrl);
        winSound.play();

        this.engine.removeSystem(this);
    }
}
