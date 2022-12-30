import Component from "./Component";

export default class Dirty extends Component {
    public value: boolean;

    constructor(isDirty: boolean = true) {
        super();
        this.value = isDirty;
    }
}
