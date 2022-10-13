import Engine from "../Engine/Engine"
import { Entity } from "../Entity/types"

export default abstract class System {
    public abstract requiredComponents: Set<Function>
    public abstract update(entities: Set<Entity>): void
    public ecs: Engine
}