import { EventQueue } from "@dimforge/rapier3d";
import Component from "./Component";

export default class RapierEventQueue extends Component {
    public value: EventQueue;

    constructor(queue: EventQueue) {
        super();
        this.value = queue;
    }
}
