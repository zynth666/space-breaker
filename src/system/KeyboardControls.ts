export default class KeyboardControls {
    public static keys: string[] = [];
    public static attached: boolean = false;

    public static inKeymap(map: string[], key: string): boolean {
        return map.findIndex(keyMapKey => key === keyMapKey) >= 0 ? true : false;
    }

    public static isPressed(key: string) {
        return this.keys.findIndex(needle => needle === key) >= 0 ? true : false;
    }

    public static keydown = (event: KeyboardEvent) => {
        if (!this.isPressed(event.code)) {
            this.keys.push(event.code);
        }
    }

    public static keyup = (event: KeyboardEvent) => {
        this.keys.splice(KeyboardControls.keys.findIndex(key => key === event.code), 1);
    }

    public static init() {
        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);
    }
}
