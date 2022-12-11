import { RigidBodyDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class KinematicVelocityBasedRigidBody extends Component {
    public value = RigidBodyDesc.kinematicVelocityBased();

    constructor(world: World) {
        super();
        world.createRigidBody(this.value);
    }
}
