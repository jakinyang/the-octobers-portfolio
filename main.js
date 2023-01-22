import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

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
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0x4cc9f0 });
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

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(dLight, ambientLight);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Background Object Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(1000).fill().forEach(addStar)

// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  renderer.setSize(sizes.width, sizes.height);
})

// Helpers
const axesHelper = new THREE.AxesHelper(5);
const lightHelper = new THREE.DirectionalLightHelper(dLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper, axesHelper);

// Test Helpers

let mode = true;
// Animate Loop
function animate() {
  requestAnimationFrame(animate);
  titleGroup.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  titleGroup.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  titleGroup.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  controls.update()
  renderer.render(scene, camera)
}

animate()