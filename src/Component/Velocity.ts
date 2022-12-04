import Component from "./Component";

export default class Velocity extends Component {
    value: number;

    constructor(velocity: number) {
        super();

        this.value = velocity;
    }
}
