import { Vector3 } from "@dimforge/rapier3d";
import Component from "./Component";

export default class Position extends Component {
    public value: Vector3;

    constructor(x: number, y: number, z: number) {
        super();
        this.value = new Vector3(x, y, z);
    }
}
