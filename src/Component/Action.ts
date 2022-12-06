import Component from "./Component";
import ComponentContainer from "./ComponentContainer";

type KeyAction<T> = (componentContainer: ComponentContainer) => T;

export interface KeyActionMap<T> {
    [keyCode: string]: KeyAction<T>
}

export default class Action<T> extends Component {
    keyMap: KeyActionMap<T>;

    constructor(keyMap: KeyActionMap<T>) {
        super();
        this.keyMap = keyMap;
    }
}
