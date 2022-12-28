import { Entity } from "../entity/types";
import Component from "./Component";

export default class Hit extends Component {
    public value: boolean;
    public lastHitEntity: Entity = -1;

    constructor() {
        super();
        this.value = false;
    }
}
