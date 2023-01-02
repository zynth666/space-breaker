import { Collider, ColliderDesc, RigidBody, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class CuboidCollider extends Component {
    public value: Collider;
    public world: World;

    constructor(width: number, height: number, depth: number, world: World, rigidBody?: RigidBody) {
        super();
        const collider = ColliderDesc.cuboid(width / 2, height / 2, depth / 2);
        this.world = world;
        this.value = world.createCollider(collider, rigidBody);
    }

    destroy(): void {
        this.world.removeCollider(this.value, true);
    }
}
