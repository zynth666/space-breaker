import * as THREE from "three";
import GUI from 'lil-gui';
import "./assets/sass/styles.scss";

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 40;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

{
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);
}

// an array of objects whose rotation to update
const objects: THREE.Object3D[] = [];

// use just one sphere for everything
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);  // make the sun large
solarSystem.add(sunMesh);
objects.push(sunMesh);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({ color: 0x2233FF, emissive: 0x112244 });
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({ color: 0x888888, emissive: 0x222222 });
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

class AxisGridHelper {
    grid: THREE.GridHelper;
    axes: THREE.AxesHelper;
    _visible: any;
    constructor(node: any, units = 10) {
        const axes = new THREE.AxesHelper();
        (axes.material as THREE.Material).depthTest = false;
        axes.renderOrder = 2;  // after the grid
        node.add(axes);

        const grid = new THREE.GridHelper(units, units);
        (grid.material as THREE.Material).depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }
    get visible() {
        return this._visible;
    }
    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
}

const gui = new GUI();
function makeAxisGrid(node: any, label: any, units: any) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}

makeAxisGrid(solarSystem, 'solarSystem', 25);
makeAxisGrid(sunMesh, 'sunMesh', 10);
makeAxisGrid(earthOrbit, 'earthOrbit', 10);
makeAxisGrid(earthMesh, 'earthMesh', 10);
makeAxisGrid(moonOrbit, 'moonOrbit', 10);
makeAxisGrid(moonMesh, 'moonMesh', 10);

renderer.render(scene, camera);

requestAnimationFrame(render);

function render(time: number) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
        obj.rotation.y = time;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}
