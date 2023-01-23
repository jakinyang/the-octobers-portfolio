// Imports
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Styles
import './style.css';

// Components
import { backboard, extrudeSettings } from './src/titleBoard';
import { addStar } from './src/environment/stars';
import { addBall } from './src/environment/balls';
import { oscillateName, oscillateTag, oscillateTitle, rotate } from './src/helpers';
import { jaeCube, jaeBoard } from './src/profiles/jae';
import {russelCube, russelBoard } from './src/profiles/russel';
import { alisaCube, alisaBoard } from './src/profiles/alisa';
import { benMCube, benMBoard } from './src/profiles/benm';
import { benSCube, benSBoard } from './src/profiles/bens';
import { corbinCube, corbinBoard } from './src/profiles/corbin';
import { darrenCube, darrenBoard } from './src/profiles/darren';
import { franciscoCube, franciscoBoard } from './src/profiles/francisco';

// Constants
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Scene
export const scene = new THREE.Scene();
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const y = document.body.getBoundingClientRect().top;
camera.position.set(0, 2, 30)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

// Render Passes
const composer = new EffectComposer(renderer);

// Render Pass
const renderPass = new RenderPass(scene, camera);

// Bloom Pass
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.6,
  0.1,
  0.1
);

bloomPass.threshold = 0;
bloomPass.strength = 1.5;
bloomPass.radius = 0.5;

// Shader Pass
const shaderPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      brightness: { value: 0 },
      contrast: { value: 0 }
    },
    vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float brightness;
    uniform float contrast;
    varying vec2 vUv;
    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      gl_FragColor = vec4(texel.rgb + brightness, texel.a);
    }
    `
  }),
)

composer.addPass(renderPass);
composer.addPass(bloomPass);
composer.addPass(shaderPass);


// Groups
export const titleGroup = new THREE.Group();
// Jae
export const jaeTagGroup = new THREE.Group();
export const jaeNameGroup = new THREE.Group();
// Russel
export const russelTagGroup = new THREE.Group();
export const russelNameGroup = new THREE.Group();
// Tim
export const timTagGroup = new THREE.Group();
export const timNameGroup = new THREE.Group();
// Satoe
export const satoeTagGroup = new THREE.Group();
export const satoeNameGroup = new THREE.Group();
// Ben S
export const benSTagGroup = new THREE.Group();
export const benSNameGroup = new THREE.Group();
// Ben Meng
export const benMTagGroup = new THREE.Group();
export const benMNameGroup = new THREE.Group();
// Heta
export const hetaTagGroup = new THREE.Group();
export const hetaNameGroup = new THREE.Group();
// Corbin
export const corbinTagGroup = new THREE.Group();
export const corbinNameGroup = new THREE.Group();
// Alisa
export const alisaTagGroup = new THREE.Group();
export const alisaNameGroup = new THREE.Group();
// Darren
export const darrenTagGroup = new THREE.Group();
export const darrenNameGroup = new THREE.Group();
// Francisco
export const franciscoTagGroup = new THREE.Group();
export const franciscoNameGroup = new THREE.Group();

// Title Group
titleGroup.add(backboard);
scene.add(titleGroup);

// Light
const dLight = new THREE.DirectionalLight(0xffffff);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Background Stars
Array(1000).fill().forEach(addStar)

// Background Balls
Array(1000).fill().forEach(addBall)


// Jae
// Avatar
scene.add(jaeCube);

// Tag Block
jaeTagGroup.position.set(10, 0, 10);
scene.add(jaeTagGroup);

// Name Block
jaeNameGroup.add(jaeBoard);
jaeNameGroup.position.set(10, -6, 15)
scene.add(jaeNameGroup);

// Russel
// Avatar
scene.add(russelCube)

// Tag Block
russelTagGroup.position.set(-15, 0, 30);
scene.add(russelTagGroup);

// Name Block
russelNameGroup.add(russelBoard);
russelNameGroup.position.set(-15, -8, 30);
scene.add(russelNameGroup);

// Alisa
// Avatar
scene.add(alisaCube)

// Tag Block
alisaTagGroup.position.set(15, 0, 45);
scene.add(alisaTagGroup);

// Name Block
alisaNameGroup.add(alisaBoard);
alisaNameGroup.position.set(15, -8, 45);
scene.add(alisaNameGroup);

// Benjamin Meng
// Avatar
scene.add(benMCube)

// Tag Block
benMTagGroup.position.set(-15, 0, 60);
scene.add(benMTagGroup);

// Name Block
benMNameGroup.add(benMBoard);
benMNameGroup.position.set(-15, -8, 60);
scene.add(benMNameGroup);

// B Stolb
// Avatar
scene.add(benSCube)

// Tag Block
benSTagGroup.position.set(15, 0, 75);
scene.add(benSTagGroup);

// Name Block
benSNameGroup.add(benSBoard);
benSNameGroup.position.set(15, -8, 75);
scene.add(benSNameGroup);

// Corbin
// Avatar
scene.add(corbinCube)

// Tag Block
corbinTagGroup.position.set(-15, 0, 90);
scene.add(corbinTagGroup);

// Name Block
corbinNameGroup.add(corbinBoard);
corbinNameGroup.position.set(-15, -8, 90);
scene.add(corbinNameGroup);

// Darren
// Avatar
scene.add(darrenCube)

// Tag Block
darrenTagGroup.position.set(15, 0, 105);
scene.add(darrenTagGroup);

// Name Block
darrenNameGroup.add(darrenBoard);
darrenNameGroup.position.set(15, -8, 105);
scene.add(darrenNameGroup);

// Francisco
// Avatar
scene.add(franciscoCube)

// Tag Block
franciscoTagGroup.position.set(-15, 0, 120);
scene.add(franciscoTagGroup);

// Name Block
franciscoNameGroup.add(franciscoBoard);
franciscoNameGroup.position.set(-15, -8, 120);
scene.add(franciscoNameGroup);

// Resize
window.addEventListener('resize', () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

// Helpers
const axesHelper = new THREE.AxesHelper(5);
const lightHelper = new THREE.DirectionalLightHelper(dLight);
const gridHelper = new THREE.GridHelper(200, 50);
// lowBloomScene.add(lightHelper, gridHelper, axesHelper);

// Animation Loop
function animate() {
  controls.update()
  requestAnimationFrame(animate);
  // Title Animation Loop
  oscillateTitle(titleGroup);
  oscillateTag(jaeTagGroup);
  oscillateName(jaeNameGroup);
  oscillateTag(russelTagGroup);
  oscillateName(russelNameGroup);
  oscillateTag(alisaTagGroup);
  oscillateName(alisaNameGroup);
  oscillateTag(benMTagGroup);
  oscillateName(benMNameGroup);
  oscillateTag(benSTagGroup);
  oscillateName(benSNameGroup);
  oscillateTag(corbinTagGroup);
  oscillateName(corbinNameGroup);
  oscillateTag(darrenTagGroup);
  oscillateName(darrenNameGroup);
  oscillateTag(franciscoTagGroup);
  oscillateName(franciscoNameGroup);

  // jaeCube Animation Loop
  rotate(jaeCube);
  rotate(russelCube);
  rotate(alisaCube);
  rotate(benMCube);
  rotate(benSCube);
  rotate(corbinCube);
  rotate(darrenCube);
  rotate(franciscoCube);


  composer.render();
}

animate()