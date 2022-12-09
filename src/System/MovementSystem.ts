import Force from "../component/Force";
import Mesh from "../component/Mesh";
import Velocity from "../component/Velocity";
import { Entity } from "../entity/types";
import System from "./System";

export default class MovementSystem extends System {
    public requiredComponents = new Set<Function>([Mesh, Velocity, Force]);

    public update(entities: Set<Entity>): void {
        entities.forEach(entity => {
            const entityContainer = this.engine.getComponents(entity);
            const mesh = entityContainer.get(Mesh);
            const velocity = entityContainer.get(Velocity);
            const force = entityContainer.get(Force);


            const distance = velocity.vec.length() * force.value;
            const axis = velocity.vec.normalize();
            mesh.three.translateOnAxis(axis, distance);
        });
    }
}
