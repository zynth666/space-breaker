import Controller from "../component/Controller";
import Direction from "../component/Direction";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class ControllerSystem extends System {
    public keyboardControls = new KeyboardControls();

    public requiredComponents = new Set<Function>([Controller, Direction]);

    public update(entities: Set<Entity>): void {
        entities.forEach((entity) => {
            const entityContainer = this.engine.getComponents(entity);
            const controller = entityContainer.get(Controller);
            const direction = entityContainer.get(Direction);

            if (this.keyboardControls.keys.length === 0) {
                this.resetDirection(direction);
                return;
            }

            this.keyboardControls.keys.forEach(key => {
                if (this.keyboardControls.isPressed(key) && this.keyboardControls.inKeymap(Object.keys(controller.keyMap), key)) {
                    this.setDirection(direction, controller.keyMap[key]);
                }
            });
        });
    }

    setDirection(direction: Direction, key: string) {
        switch (key) {
            case "left":
                direction.vec.setX(-1);
                break;
            case "right":
                direction.vec.setX(1);
                break;
        }
    }

    resetDirection(direction: Direction) {
        direction.vec.set(0, 0, 0);
    }
}
