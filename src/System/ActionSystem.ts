import Action from "../component/Action";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class ActionSystem extends System {
    public keyboardControls = new KeyboardControls();

    public requiredComponents = new Set<Function>([Action]);

    public update(entities: Set<Entity>): void {
        entities.forEach((entity) => {
            const entityContainer = this.engine.getComponents(entity);
            const action = entityContainer.get(Action);

            this.keyboardControls.keys.forEach(key => {
                if (this.keyboardControls.isPressed(key) && this.keyboardControls.inKeymap(Object.keys(action.keyMap), key)) {
                    action.keyMap[key](entityContainer);
                }
            });
        });
    }
}
