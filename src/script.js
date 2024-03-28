import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// AOS
AOS.init();

// Canvas
const canvas = document.querySelector('canvas.webgl');


// Constants

const sizes = { width: window.innerWidth * 0.8, height: window.innerHeight * 0.9}
var device;
if (window.device.mobile()) {
    device = "mobile"; 
    const greetHeading = document.getElementById("greetHeading");
    greetHeading.style.marginTop = "120%"
    canvas.style.border= "1px solid rgb(8,8,8)"
    canvas.style.borderRadius = "10px"
} else if (window.device.desktop()) {
    device = "desktop";
    sizes.width = window.innerWidth - 80 ;
    sizes.height = window.innerHeight -80 ; 
    const homeTitle = document.getElementById("homeTitle");
    homeTitle.style.marginTop = "20%"
    const greetHeading = document.getElementById("greetHeading");
    greetHeading.style.marginTop = "25%"
} else {
    device = "tablet"; 
}


// Scene
const scene = new THREE.Scene();

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000000);
camera.position.set(0, 0, 1000);
camera.rotation.set(0.1,0.1, 0.1);
camera.scale.set(0.1, 0.1, 0.1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = true;
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.maxDistance = 1000;
// Load 3D model
const gltf_loader = new GLTFLoader();
let model;
gltf_loader.load('./model/scene.gltf', (gltf) => {
    model = gltf.scene;

    // Set the scale of the model
    model.position.set(0,-300,0)
    model.scale.set(2, 2,2);
    scene.add(model);
});

// Disable controls on scroll
let isScrolling = false;

window.addEventListener('scroll', () => {
    isScrolling = true;
    controls.enabled = false;

    setTimeout(() => {
        isScrolling = false;
    }, 100);
});

// Enable controls when not scrolling
const checkScroll = () => {
    if (!isScrolling) {
        controls.enabled = true;
    }
    requestAnimationFrame(checkScroll);
};

checkScroll();


// Ambient light
const light = new THREE.AmbientLight('white', 3);
scene.add(light);

// Environment cube
const environmentGeometry = new THREE.BoxBufferGeometry(14, 14, 14, 2, 2, 2);
const environmentMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, wireframe: true, color: 'white' });
const environmentCube = new THREE.Mesh(environmentGeometry, environmentMaterial);

const background = new THREE.Mesh(new THREE.SphereBufferGeometry(5000, 600, 400), new THREE.MeshBasicMaterial({side: THREE.BackSide,color:'rgb(0,0,0)' }));
scene.add(background);

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


const resize = () => {
    sizes.width = window.innerWidth -80;
    sizes.height = window.innerHeight -80;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
// elements 

const majorHeading = document.querySelectorAll(".majorHeading");
if(device == "mobile") {
    majorHeading.forEach(element => {
        element.style.fontSize = "4rem";
        element.style.textAlign = "center"; 
        element.style.marginLeft = "0px";
    });
} else {

}

const majorPragraph = document.querySelectorAll(".majorParagraph");
if(device != "desktop") {
    majorPragraph.forEach(element => {
        element.style.fontSize = "1.5rem";
    });
}

const skill = document.querySelectorAll(".skill");
if(device != "desktop") {
    skill.forEach(element => {
        element.style.fontSize = "1rem";
        element.style.margin = "0px"
        element.style.padding = "0px"
    });
}

const skillsListItem = document.querySelectorAll(".skillsListItem");
if(device != "desktop") {
    skillsListItem.forEach(element => {
        element.style.margin = "10px";
    });
}

const listItemLinks = document.querySelectorAll(".listItemLinks");
if(device != "desktop") {
    listItemLinks.forEach(element => {
        element.style.fontSize = "2rem";
    });
}

const timeHeading = document.querySelectorAll(".timeHeading");
if(device != "desktop") {
    timeHeading.forEach(element => {
        element.style.fontSize = "1.5rem";
    });
}

const greetHeading = document.getElementById("greetHeading");
if(device != "desktop") {
    greetHeading.style.fontSize = "2rem";
}

const quote = document.getElementById("quote");
const author = document.getElementById("author");
if(device != "desktop") {
    quote.style.fontSize = "1.5rem";
    author.style.fontSize = "1rem";
}

const majorDiv = document.querySelectorAll(".majorDiv");
if(device == "mobile") {
    majorDiv.forEach(element => {
        element.style.marginTop = "3rem";
    });
}

const projectHeading = document.querySelectorAll(".projectHeading");
if(device != "desktop") {
    projectHeading.forEach(element => {
        element.style.fontSize = "2rem";
    });
}

const contactList = document.getElementById("contactList");
if(device == "desktop") {
    contactList.style.marginBottom = "5rem";
}
