import Action from "../component/Action";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class ActionSystem extends System {
    public requiredComponents = new Set<Function>([Action]);

    public update(entities: Set<Entity>): void {
        entities.forEach((entity) => {
            const entityContainer = this.engine.getComponents(entity);
            const action = entityContainer.get(Action);

            KeyboardControls.keys.forEach(key => {
                if (KeyboardControls.isPressed(key) && KeyboardControls.inKeymap(Object.keys(action.keyMap), key)) {
                    action.keyMap[key](entityContainer);
                }
            });
        });
    }
}
