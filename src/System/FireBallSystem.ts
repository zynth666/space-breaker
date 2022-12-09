import Fireable from "../component/Fireable";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class FireBallSystem extends System {
    public requiredComponents = new Set<Function>([Fireable]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const fireable = entityContainer.get(Fireable);
            const mesh = entityContainer.get(Mesh);

            if (fireable.value && KeyboardControls.isPressed(fireable.fireKey)) {
                fireable.value = false;

                const velocity = new Velocity();
                velocity.vec.set(Math.random() * 2 - 1, 0, -1);
                this.engine.addComponent(entity, velocity);

                const scene = mesh.three.parent.parent;
                scene.attach(mesh.three);
            }
        });
    }
}
