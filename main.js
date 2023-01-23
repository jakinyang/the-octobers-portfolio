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
import { jaeCube, jaeBoard } from './src/profiles/jae';
import { backboard, extrudeSettings } from './src/titleBoard';
import { addStar } from './src/environment/stars';
import { addBall } from './src/environment/balls';
import { oscillateName, oscillateTag, oscillateTitle, rotate } from './src/helpers';
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
export const jaeTagGroup = new THREE.Group();
export const jaeNameGroup = new THREE.Group();

// Title Group
titleGroup.add(backboard);
scene.add(titleGroup);

// Light
const dLight = new THREE.DirectionalLight(0xffffff);
// lowBloomScene.add(dLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Background Stars
Array(1000).fill().forEach(addStar)

// Background Balls
Array(1000).fill().forEach(addBall)
scene.add(jaeCube);

// Jae
// Tag Block
jaeTagGroup.position.set(10, 0, 10);
scene.add(jaeTagGroup);

// Name Block
jaeNameGroup.add(jaeBoard);
jaeNameGroup.position.set(10, -6, 10)
scene.add(jaeNameGroup);

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

  // jaeCube Animation Loop
  rotate(jaeCube);

  composer.render();
}

animate()