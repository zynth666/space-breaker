import Component from "./Component";

export default class Force extends Component {
    public value: number;

    constructor(force: number) {
        super();
        this.value = force;
    }
}
