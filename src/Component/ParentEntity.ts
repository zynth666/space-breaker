import { Entity } from "../entity/types";
import Component from "./Component";

export default class ParentEntity extends Component {
    public value: Entity;

    constructor(value: Entity) {
        super();
        this.value = value;
    }
}
