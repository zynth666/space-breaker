import { RigidBody, RigidBodyDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class DynamicRigidBody extends Component {
    public value: RigidBody;
    public constructor(world: World) {
        super();
        const rigidBody = RigidBodyDesc.dynamic();
        this.value = world.createRigidBody(rigidBody);
    }
}
