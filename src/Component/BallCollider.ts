import { ColliderDesc, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class BallCollider extends Component {
    public value: ColliderDesc;

    constructor(size: number, world: World) {
        super();
        this.value = ColliderDesc.ball(size);
        world.createCollider(this.value);
    }
}
