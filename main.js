import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { jaeCube } from './src/profiles/jae';

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
camera.position.set(0, 2, 40)

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
const jaeTagGroup = new THREE.Group();


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

const backboardShape = new THREE.Shape();
backboardShape.moveTo(0, 0);
backboardShape.lineTo(0, width);
backboardShape.lineTo(length, width);
backboardShape.lineTo(length, 0);
backboardShape.lineTo(0, 0);

const extrudeSettings = {
  steps: 2,
  depth: 0.3,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 1,
  bevelOffset: 0,
  bevelSegments: 20
};

const geometry = new THREE.ExtrudeGeometry(backboardShape, extrudeSettings);
const material = new THREE.MeshBasicMaterial({ color: 0x3a0ca3 });
const backboard = new THREE.Mesh(geometry, material);
backboard.position.set(-3, 0.2, -0.15);
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

scene.add(jaeCube);


// Tag Block
// Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `MUSIC DOER
  FOOD EATER
  TREE PLANTER`, {
      size: 1,
      height: 0.4,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xff6d00 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    jaeTagGroup.add(tagtextMesh);
  }
)

// Backboard
const tagboardLength = 10, tagboardWidth = 5.5;

const tagboardShape = new THREE.Shape();
tagboardShape.moveTo(0, 0);
tagboardShape.lineTo(-0.7, tagboardWidth);
tagboardShape.lineTo(tagboardLength - 0.7, tagboardWidth);
tagboardShape.lineTo(tagboardLength + 0.7, 0);
tagboardShape.lineTo(0.7, 0);

const tagboardGeometry = new THREE.ExtrudeGeometry(tagboardShape, extrudeSettings);
const tagboardMaterial = new THREE.MeshBasicMaterial({ color: 0x027a00 });
const tagboard = new THREE.Mesh(tagboardGeometry, tagboardMaterial);
tagboard.position.set(10, 0, 10);
// jaeTagGroup.add(tagboard);
jaeTagGroup.position.set(10, 0, 10);
scene.add(jaeTagGroup);

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

// Test Helpers
const oscillateTitle = (group) => {
  group.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  group.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  group.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
}
const oscillateTag = (group) => {
  group.rotation.z = Math.sin(Date.now() * -0.001) * Math.PI * 0.05;
  group.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.005;
  group.rotation.x = Math.sin(Date.now() * -0.001) * Math.PI * 0.01;
}

const oscillateName = (group) => {
  group.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  group.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  group.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
}

const rotate = (group) => {
  group.rotation.x += 0.00001;
  group.rotation.y += 0.003;
  group.rotation.z += 0.00001;
}

// Animate Loop
function animate() {
  controls.update()
  requestAnimationFrame(animate);
  // Title Animation Loop
  oscillateTitle(titleGroup);
  oscillateTag(jaeTagGroup)

  // jaeCube Animation Loop
  rotate(jaeCube);

  composer.render();
}

animate()