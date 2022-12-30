import Component from "./Component";
import { KeyMap } from "./types";

export default class Controller extends Component {
    keyMap: KeyMap;

    constructor(keyMap: KeyMap) {
        super();

        this.keyMap = keyMap;
    }
}
