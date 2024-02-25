import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// Constants
const sizes = { width: window.innerWidth, height: window.innerHeight }
var device;
if (window.device.mobile()) { device = "mobile"; }
else if (window.device.desktop()) { device = "desktop"; }
else { device = "tablet"; }

// Canvas
const canvas = document.querySelector('canvas.webgl');
canvas.style.maxWidth = window.innerWidth + 'px';
canvas.style.maxHeight = window.innerHeight + 'px';

// Scene
const scene = new THREE.Scene();

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000000);
camera.position.set(0, 0.1, -0.1);
camera.rotation.set(0,0, 0);
camera.scale.set(0.1, 0.1, 0.1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 2;
// Load 3D model
const gltf_loader = new GLTFLoader();
let model;
gltf_loader.load('./model/scene.gltf', (gltf) => {
    model = gltf.scene;

    model = gltf.scene;
    model.scale.set(570, 570, 570);

    // Calculate offset to move the center of the model
    const modelSize = new THREE.Vector3();
    new THREE.Box3().setFromObject(model).getSize(modelSize);
    const centerOffset = new THREE.Vector3(+300, -1300, -10).sub(modelSize.clone().multiplyScalar(0.5));

    model.position.copy(centerOffset);
    console.log(model.position.x, model.position.y, model.position.z);

    scene.add(model);

});

// Ambient light
const light = new THREE.AmbientLight('white', 1);
scene.add(light);

// Environment cube
const environmentGeometry = new THREE.BoxBufferGeometry(14, 14, 14, 2, 2, 2);
const environmentMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, wireframe: true, color: 'white' });
const environmentCube = new THREE.Mesh(environmentGeometry, environmentMaterial);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Render and animate
const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    environmentCube.rotation.x = elapsedTime * 0.5;
    environmentCube.rotation.y = elapsedTime * 0.5;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

// Start the animation
tick();
