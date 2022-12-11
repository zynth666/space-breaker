import { RigidBodyDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class FixedRigidBody extends Component {
    public value: RigidBodyDesc;

    constructor(world: World) {
        super();
        this.value = RigidBodyDesc.fixed();
        world.createRigidBody(this.value);
    }
}
