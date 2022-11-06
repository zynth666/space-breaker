import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Ammo from 'ammojs-typed';
import "./assets/sass/styles.scss";
import Engine from "./engine/Engine";
import Renderer from "./system/Renderer";
import RendererComponent from "./component/Renderer";
import Scene from "./component/Scene";
import Camera from "./component/Camera";
import Mesh from "./component/Mesh";
import SceneInitializer from "./init/SceneInitializer";
import RendererInitializer from "./init/RendererInitializer";
import CameraInitializer from "./init/CameraInitializer";

const engine = new Engine();

Ammo(Ammo).then(() => {
    init();
    renderFrame();
});

function init() {
    const renderer = new Renderer();

    const renderEntity = engine.addEntity();

    const rendererComponent = RendererInitializer.create(RendererComponent)
    const sceneComponent = SceneInitializer.create(Scene);
    const cameraComponent = CameraInitializer.create(Camera);

    engine.addComponent(renderEntity, rendererComponent);
    engine.addComponent(renderEntity, sceneComponent);
    engine.addComponent(renderEntity, cameraComponent);

    engine.addSystem(renderer);

    new OrbitControls(cameraComponent.three, rendererComponent.three.domElement);

    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
    hemiLight.color.setHSL(0.6, 0.6, 0.6);
    hemiLight.groundColor.setHSL(0.1, 1, 0.4);
    hemiLight.position.set(0, 50, 0);
    sceneComponent.three.add(hemiLight);

    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(100);
    sceneComponent.three.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    let d = 50;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 13500;

    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    const mesh = new Mesh(cubeGeo, cubeMat);
    mesh.three.position.set(cubeSize + 1, cubeSize / 2, 0);
    sceneComponent.three.add(mesh.three);
}

function renderFrame() {
    engine.update();
    requestAnimationFrame(renderFrame);
}
