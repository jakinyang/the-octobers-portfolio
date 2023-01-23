import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Constants
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const y = document.body.getBoundingClientRect().top;
camera.position.set(0, 2, 7)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

// Render Passes
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.6,
  0.1,
  0.1
);

bloomPass.threshold = 0;
bloomPass.strength = 1.5;
bloomPass.radius = 0.5;

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
const titleGroup = new THREE.Group();

// Font
const fontLoader = new FontLoader();
fontLoader.load(
  '/fonts/Koulen_Regular.json',
  (koulen) => {
    const textGeometry = new TextGeometry('The Octobers', {
      size: 1,
      height: 0.4,
      font: koulen
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff6d00 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-3.5, 0, 0)
    titleGroup.add(textMesh);
  }
)

// Backboard
const length = 6, width = 0.5;

const shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(0, width);
shape.lineTo(length, width);
shape.lineTo(length, 0);
shape.lineTo(0, 0);

const extrudeSettings = {
  steps: 2,
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 20
};

const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
const material = new THREE.MeshBasicMaterial({ color: 0x3a0ca3 });
const backboard = new THREE.Mesh(geometry, material);
backboard.position.set(-3, 0.2, -0.15);
titleGroup.add(backboard);

scene.add(titleGroup);

// Light
const dLight = new THREE.DirectionalLight(0xffffff);
// scene.add(dLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Background Object Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar)

// Balls
const ballGeometry = new THREE.IcosahedronGeometry(1, 15);

for (let i = 0; i < 500; i++) {

  const color = new THREE.Color();
  color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

  const ballMaterial = new THREE.MeshBasicMaterial({ color: color });
  const sphere = new THREE.Mesh(ballGeometry, ballMaterial);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
  sphere.position.set(x, y, z);
  sphere.scale.setScalar(Math.random() * Math.random() + 0.5);
  scene.add(sphere);

}
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
scene.add(lightHelper, gridHelper, axesHelper);

// Test Helpers

// Animate Loop
function animate() {
  controls.update()
  requestAnimationFrame(animate);
  // Title Animation Loop
  titleGroup.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  titleGroup.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  titleGroup.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;

  composer.render();
}

animate()