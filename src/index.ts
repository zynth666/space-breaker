import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Ammo from 'ammojs-typed';
import "./assets/sass/styles.scss";
import Engine from "./engine/Engine";
import Renderer from "./system/Renderer";

const engine = new Engine();
const renderer = new Renderer();

Ammo(Ammo).then(() => {
    init();
    renderFrame();
});

function init() {
    //Setup the renderer
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.setClearColor(0xbfd1e5);

    renderer.outputEncoding = THREE.sRGBEncoding;

    renderer.shadowMap.enabled = true;

    //create clock for timing
    const clock = new THREE.Clock();

    //create the scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfd1e5);

    //create camera
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.2, 5000);
    camera.position.set(0, 30, 70);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const controls = new OrbitControls(camera, renderer.domElement);

    //Add hemisphere light
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
    hemiLight.color.setHSL(0.6, 0.6, 0.6);
    hemiLight.groundColor.setHSL(0.1, 1, 0.4);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    //Add directional light
    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(100);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    let d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 13500;
}

function renderFrame() {
    requestAnimationFrame(renderFrame);
}


