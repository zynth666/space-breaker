import Controller from "../component/Controller";
import Direction from "../component/Direction";
import { Entity } from "../entity/types";
import System from "./System";

export default class ControllerSystem extends System {
    keys: string[]

    constructor() {
        super();
        this.keys = [];
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    public requiredComponents = new Set<Function>([Controller, Direction]);

    public update(entities: Set<Entity>): void {
        entities.forEach((entity) => {
            const entityContainer = this.engine.getComponents(entity);
            const controller = entityContainer.get(Controller);
            const direction = entityContainer.get(Direction);

            if (this.keys.length === 0) {
                this.resetDirection(direction);
            }

            this.keys.forEach(key => {
                if (this.isPressed(key) && this.inKeymap(controller, key)) {
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

    keydown = (event: KeyboardEvent) => {
        if (!this.isPressed(event.key)) {
            this.keys.push(event.key);
        }
    }

    keyup = (event: KeyboardEvent) => {
        this.keys.splice(this.keys.findIndex(key => key === event.key), 1);
    }

    isPressed(key: string) {
        return this.keys.findIndex(needle => needle === key) >= 0 ? true : false;
    }

    resetDirection(direction: Direction) {
        direction.vec.set(0, 0, 0);
    }

    inKeymap(controller: Controller, key: string) {
        return controller.keyMap[key];
    }
}
