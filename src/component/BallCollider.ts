import { Collider, ColliderDesc, RigidBody, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class BallCollider extends Component {
    public value: Collider;
    public world: World;

    constructor(size: number, world: World, rigidBody?: RigidBody) {
        super();
        const collider = ColliderDesc.ball(size);
        this.world = world;
        this.value = world.createCollider(collider, rigidBody);
    }

    destroy(): void {
        this.world.removeCollider(this.value, true);
    }
}
