import { Entity } from "../entity/types";
import Component from "./Component";

export default class Hit extends Component {
    public value: boolean = false;
    public lastHitEntity: Entity = -1;
}
