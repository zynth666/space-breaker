import Animation from "../component/Animation";
import Controller from "../component/Controller";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class CharacterControllerSystem extends System {
    public requiredComponents = new Set<Function>([Controller, Animation]);
    private hasntPressedKey = true;

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const controller = entityContainer.get(Controller);
            const animation = entityContainer.get(Animation);

            if (KeyboardControls.keys.length === 0) {
                this.engine.removeComponent(entity, Velocity)

                if (this.hasntPressedKey) {
                    animation.name = "1 Idle";
                    return;
                }

                animation.name = "2 Start";
                return;
            }

            KeyboardControls.keys.forEach(key => {
                if (KeyboardControls.isPressed(key) && KeyboardControls.inKeymap(Object.keys(controller.keyMap), key)) {
                    this.setActionsOnControllerInput(controller.keyMap[key], entity, animation);
                }
            });
        });
    }

    setActionsOnControllerInput(key: string, entity: Entity, animation: Animation) {
        const velocity = new Velocity();

        if (this.hasntPressedKey) {
            this.hasntPressedKey = false;
            animation.name = "2 Start";
        }

        switch (key) {
            case "left":
                velocity.vec.setX(-0.4);
                animation.name = "4 Links Lenken";
                break;
            case "right":
                velocity.vec.setX(0.4);
                animation.name = "3 Rechts Lenken";
                break;
        }

        this.engine.addComponent(entity, velocity)
    }
}
