import Controller from "../component/Controller";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class CharacterControllerSystem extends System {
    public requiredComponents = new Set<Function>([Controller]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const controller = entityContainer.get(Controller);

            if (KeyboardControls.keys.length === 0) {
                this.engine.removeComponent(entity, Velocity)
                return;
            }

            KeyboardControls.keys.forEach(key => {
                if (KeyboardControls.isPressed(key) && KeyboardControls.inKeymap(Object.keys(controller.keyMap), key)) {
                    this.setVelocity(controller.keyMap[key], entity);
                }
            });
        });
    }

    setVelocity(key: string, entity: Entity) {
        const velocity = new Velocity();

        switch (key) {
            case "left":
                velocity.vec.setX(-0.4);
                break;
            case "right":
                velocity.vec.setX(0.4);
                break;
        }

        this.engine.addComponent(entity, velocity)
    }
}
