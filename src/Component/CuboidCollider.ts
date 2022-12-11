import { Collider, ColliderDesc, RigidBody, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class CuboidCollider extends Component {
    public value: Collider;

    constructor(width: number, height: number, depth: number, world: World, rigidBody?: RigidBody) {
        super();
        const collider = ColliderDesc.cuboid(width, height, depth);
        this.value = world.createCollider(collider, rigidBody);
    }
}
