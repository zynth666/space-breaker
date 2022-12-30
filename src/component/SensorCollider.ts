import { Collider, ColliderDesc, RigidBody, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class SensorCollider extends Component {
    public value: Collider;

    constructor(width: number, height: number, depth: number, world: World, rigidBody?: RigidBody) {
        super();

        const collider = ColliderDesc.cuboid(width / 2, height / 2, depth / 2);
        collider.setSensor(true);

        this.value = world.createCollider(collider, rigidBody);
    }
}
