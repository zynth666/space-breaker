import Component from "../Component";

export type ComponentClass<T extends Component> = new (...args: any[]) => T
