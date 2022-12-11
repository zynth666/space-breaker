import { RigidBody, RigidBodyDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class KinematicVelocityBasedRigidBody extends Component {
    public value: RigidBody;

    constructor(world: World) {
        super();
        const rigidBody = RigidBodyDesc.kinematicVelocityBased();
        this.value = world.createRigidBody(rigidBody);
    }
}
