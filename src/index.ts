import "./assets/sass/styles.scss";
import Engine from "./engine/Engine";

import RenderSystem from "./system/RenderSystem";
import RendererInitializer from "./init/RendererInitializer";
import HemisphereLightInitializer from "./init/HemisphereLightInitializer";
import DirectionalLightInitializer from "./init/DirectionalLightInitializer";
import ControllerSystem from "./system/ControllerSystem";
import CharacterMovementSystem from "./system/CharacterMovementSystem";
import PaddleInitializer from "./init/PaddleInitializer";
import Level1Initializer from "./init/Level1Initializer";
import ArenaInitializer from "./init/ArenaInitializer";
import BallInitializer from "./init/BallInitializer";
import FireBallSystem from "./system/FireBallSystem";
import KeyboardControls from "./system/KeyboardControls";
import Scene from "./component/Scene";
import type { Rapier } from "./types";
import { World } from "@dimforge/rapier3d";
const engine = new Engine();

import('@dimforge/rapier3d').then(async RAPIER => {
    const world = new RAPIER.World({ x: 0.0, y: 0.0, z: 0.0 });
    await init(RAPIER, world);
    renderFrame();
});

async function init(RAPIER: Rapier, world: World) {
    KeyboardControls.init();
    const renderSystem = new RenderSystem();
    const controllerSystem = new ControllerSystem();
    const fireBallSystem = new FireBallSystem();
    const movementSystem = new CharacterMovementSystem();

    engine.addSystem(renderSystem);
    engine.addSystem(controllerSystem);
    engine.addSystem(fireBallSystem);
    engine.addSystem(movementSystem);

    const renderer = RendererInitializer.create(engine);
    const scene = engine.getComponents(renderer).get(Scene).three;

    HemisphereLightInitializer.create(engine, scene);
    DirectionalLightInitializer.create(engine, scene);

    /* const dustGeometry = new THREE.DodecahedronGeometry(1, 0);
    const dustMaterial = new THREE.MeshPhongMaterial({ color: 0x010101 });
    const mesh = new Mesh(dustGeometry, dustMaterial);
    mesh.three.position.set(30, 0, 0);

    scene.add(mesh.three); */

    const paddle = PaddleInitializer.create(engine, scene, world);

    BallInitializer.create(engine, paddle);

    const arena = ArenaInitializer.create(world);
    scene.add(arena);

    await Level1Initializer.create(engine, scene);
}

function renderFrame() {
    engine.update();
    requestAnimationFrame(renderFrame);
}
