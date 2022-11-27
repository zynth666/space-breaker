import Direction from "../component/Direction";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class MovementSystem extends System {
    public requiredComponents = new Set<Function>([Direction, Mesh, Velocity]);

    public update(entities: Set<Entity>): void {
        entities.forEach((entity) => {
            const entityContainer = this.engine.getComponents(entity);
            const mesh = entityContainer.get(Mesh);
            const direction = entityContainer.get(Direction);
            const velocity = entityContainer.get(Velocity);

            mesh.three.translateOnAxis(direction.vec, velocity.value);
        });
    }
}
