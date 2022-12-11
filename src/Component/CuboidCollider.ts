import { ColliderDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class CuboidCollider extends Component {
    public value: ColliderDesc;

    constructor(width: number, height: number, depth: number, world: World) {
        super();
        this.value = ColliderDesc.cuboid(width, height, depth);
        world.createCollider(this.value);
    }
}
