import Engine from "../engine/Engine"
import { Entity } from "../entity/types"

export default abstract class System {
    public abstract requiredComponents: Set<Function>
    public abstract update(entities: Set<Entity>): void
    public engine: Engine
}
