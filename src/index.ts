import * as THREE from "three";
import "./assets/sass/styles.scss";

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

/* const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light); */

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const cubes: any = [];
const loader = new THREE.TextureLoader();

const materials = [
    new THREE.MeshBasicMaterial({ map: loader.load(require('./assets/images/flower-1.jpg')) }),
    new THREE.MeshBasicMaterial({ map: loader.load(require('./assets/images/flower-2.jpg')) }),
    new THREE.MeshBasicMaterial({ map: loader.load(require('./assets/images/flower-3.jpg')) }),
    new THREE.MeshBasicMaterial({ map: loader.load(require('./assets/images/flower-4.jpg')) }),
    new THREE.MeshBasicMaterial({ map: loader.load(require('./assets/images/flower-5.jpg')) }),
    new THREE.MeshBasicMaterial({ map: loader.load(require('./assets/images/flower-6.jpg')) }),
];

const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
cubes.push(cube);

renderer.render(scene, camera);

requestAnimationFrame(render);

function render(time: number) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    cubes.forEach((cube: any, ndx: any) => {
        const speed = .2 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
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
