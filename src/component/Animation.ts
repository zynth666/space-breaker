import Component from "./Component";

export default class Animation extends Component {
    public name: string;
    public timeScale: number;

    constructor(name: string, timeScale: number) {
        super();
        this.name = name;
        this.timeScale = timeScale;
    }
}
