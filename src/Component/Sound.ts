import Component from "./Component";

export default class Sound extends Component {
    value: HTMLAudioElement;

    constructor(path: string) {
        super();
        this.value = new Audio(path);
    }
}
