import "./assets/sass/styles.scss";
import Ammo from 'ammojs-typed';
import Engine from "./engine/Engine";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import RenderSystem from "./system/RenderSystem";
import SceneInitializer from "./init/SceneInitializer";
import RendererInitializer from "./init/RendererInitializer";
import CameraInitializer from "./init/CameraInitializer";
import HemisphereLightInitializer from "./init/HemisphereLightInitializer";
import DirectionalLightInitializer from "./init/DirectionalLightInitializer";
import ControllerSystem from "./system/ControllerSystem";
import MovementSystem from "./system/MovementSystem";
import PaddleInitializer from "./init/PaddleInitializer";
import Level1Initializer from "./init/Level1Initializer";
import ArenaInitializer from "./init/ArenaInitializer";
import BallInitializer from "./init/BallInitializer";
import FireBallSystem from "./system/FireBallSystem";
import KeyboardControls from "./system/KeyboardControls";

const engine = new Engine();

Ammo(Ammo).then(async () => {
    await init();
    renderFrame();
});

async function init() {
    KeyboardControls.init();
    const renderSystem = new RenderSystem();
    const controllerSystem = new ControllerSystem();
    const fireBallSystem = new FireBallSystem();
    const movementSystem = new MovementSystem();

    engine.addSystem(renderSystem);
    engine.addSystem(controllerSystem);
    engine.addSystem(fireBallSystem);
    engine.addSystem(movementSystem);

    const rendererComponent = RendererInitializer.create();
    const scene = SceneInitializer.create();
    const cameraComponent = CameraInitializer.create();

    const renderEntity = engine.addEntity();
    engine.addComponent(renderEntity, rendererComponent);
    engine.addComponent(renderEntity, scene);
    engine.addComponent(renderEntity, cameraComponent);


    new OrbitControls(cameraComponent.three, rendererComponent.three.domElement);

    const hemiLight = HemisphereLightInitializer.create(engine);
    scene.three.add(hemiLight.three);

    const dirLight = DirectionalLightInitializer.create(engine);
    scene.three.add(dirLight.three);

    /* const dustGeometry = new THREE.DodecahedronGeometry(1, 0);
    const dustMaterial = new THREE.MeshPhongMaterial({ color: 0x010101 });
    const mesh = new Mesh(dustGeometry, dustMaterial);
    mesh.three.position.set(30, 0, 0);

    scene.three.add(mesh.three); */

    const paddle = PaddleInitializer.create(engine);
    scene.three.add(paddle.three);

    const ball = BallInitializer.create(engine);
    paddle.three.add(ball.three);

    const arena = ArenaInitializer.create();
    scene.three.add(arena);

    await Level1Initializer.create(scene);
}

function renderFrame() {
    engine.update();
    requestAnimationFrame(renderFrame);
}
