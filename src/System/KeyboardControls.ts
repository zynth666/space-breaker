export default class KeyboardControls {
    keys: string[] = [];

    constructor() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }

    public inKeymap(keyMapKeys: string[], key: string): boolean {
        return keyMapKeys.findIndex(keyMapKey => key === keyMapKey) >= 0 ? true : false;
    }

    public isPressed(key: string) {
        return this.keys.findIndex(needle => needle === key) >= 0 ? true : false;
    }

    public keydown = (event: KeyboardEvent) => {
        if (!this.isPressed(event.key)) {
            this.keys.push(event.key);
        }
    }

    public keyup = (event: KeyboardEvent) => {
        this.keys.splice(this.keys.findIndex(key => key === event.key), 1);
    }
}
