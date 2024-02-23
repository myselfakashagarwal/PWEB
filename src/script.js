import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

//constants 


//contants 
const sizes = { width: window.innerWidth,height: window.innerHeight}
var device;
if (window.device.mobile()) { device = "mobile";} 
else if (window.device.desktop()) { device = "desktop"; } 
else { device = "tablet"; } 

// Canvas
const canvas = document.querySelector('canvas.webgl');canvas.style.maxWidth = window.innerWidth+'px';canvas.style.maxHeight = window.innerHeight+'px'

// Scene
const scene = new THREE.Scene()

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.001, 1000000)
camera.position.set(0,0,1)
camera.rotation.set(0,Math.PI,0)
camera.scale.set(1,1,1)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = true
controls.maxDistance = 1
 // controls.minPolarAngle = Math.PI / 2; // Minimum angle (straight up)
// controls.maxPolarAngle = Math.PI / 2; // Maximum angle (straight down)
controls.minAzimuthAngle = -Math.PI / 2; // Don't let the camera go below the ground

////////////////////////////////////////////////3d stuf`///////////////////////////////////////////////

const gltf_loader=new GLTFLoader()
let model;
gltf_loader.load('./model/scene.gltf',(gltf)=>{ model=gltf.scene;model.scale.set(0.4,0.4,0.4);model.position.set(0,0,0);scene.add(model);})    

const light = new THREE.AmbientLight( 'white',10 ); 
scene.add( light );

const environmentGeometry = new THREE.BoxBufferGeometry( 14, 14, 14,3,3,3 );
const environmentMaterial = new THREE.MeshNormalMaterial( {side: THREE.BackSide,wireframe: true } );
const environmentCube = new THREE.Mesh( environmentGeometry, environmentMaterial );
scene.add( environmentCube );


////////////////////////////////////////////////////////////////////////////////////////////////////////

//Render and animation
const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    environmentCube.rotation.x = elapsedTime 
    environmentCube.rotation.y = elapsedTime
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()



//////////////////////////////////////////////// content  ///////////////////////////////////////////////////////////
