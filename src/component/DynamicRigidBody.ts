import { RigidBody, RigidBodyDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class DynamicRigidBody extends Component {
    public value: RigidBody;
    public world: World;

    public constructor(world: World) {
        super();
        const rigidBody = RigidBodyDesc.dynamic();
        this.world = world;
        this.value = world.createRigidBody(rigidBody);
    }

    destroy(): void {
        this.world.removeRigidBody(this.value);
    }
}
