import DynamicRigidBody from "../component/DynamicRigidBody";
import Fireable from "../component/Fireable";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import KeyboardControls from "./KeyboardControls";
import System from "./System";

export default class FireBallSystem extends System {
    public requiredComponents = new Set<Function>([Fireable, DynamicRigidBody]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const fireable = entityContainer.get(Fireable);
            const mesh = entityContainer.get(Mesh);
            const rigidBody = entityContainer.get(DynamicRigidBody);

            if (KeyboardControls.isPressed(fireable.fireKey)) {
                this.engine.removeComponent(entity, Fireable);

                const velocity = new Velocity();
                velocity.vec.set(Math.random() * 10 - 1, 0, -1);
                rigidBody.value.setLinvel(velocity.vec, true);
                this.engine.addComponent(entity, velocity);

                const scene = mesh.three.parent.parent;
                scene.attach(mesh.three);
            }
        });
    }
}
