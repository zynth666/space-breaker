import * as THREE from "three";
import Renderer from "../component/Renderer";

export default class RendererInitializer {
    public static create<T extends Renderer>(c: new (renderer: THREE.WebGLRenderer) => T): T {
        const canvas = document.querySelector('#canvas');
        const webGlRenderer = new THREE.WebGLRenderer({ antialias: true, canvas });
        webGlRenderer.setClearColor(0xbfd1e5);
        webGlRenderer.outputEncoding = THREE.sRGBEncoding;
        webGlRenderer.shadowMap.enabled = true;
        return new c(webGlRenderer);
    }
}
