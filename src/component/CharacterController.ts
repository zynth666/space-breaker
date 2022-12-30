import { KinematicCharacterController, World } from "@dimforge/rapier3d";
import Component from "./Component";

export default class CharacterController extends Component {
    public value: KinematicCharacterController;

    constructor(world: World, offset: number = 0.01) {
        super();
        this.value = world.createCharacterController(offset);
    }
}
