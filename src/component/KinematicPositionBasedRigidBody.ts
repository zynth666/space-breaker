import { RigidBody, RigidBodyDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class KinematicPositionBasedRigidBody extends Component {
    public value: RigidBody;
    public world: World;

    constructor(world: World) {
        super();
        const rigidBody = RigidBodyDesc.kinematicPositionBased();

        this.world = world;
        this.value = world.createRigidBody(rigidBody);
    }

    destroy(): void {
        this.world.removeRigidBody(this.value);
    }
}
