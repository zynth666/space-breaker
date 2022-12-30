import { World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class PhysicsWorld extends Component {
    public value: World;

    constructor(world: World) {
        super();
        this.value = world;
    }
}
