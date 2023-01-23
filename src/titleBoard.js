import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { titleGroup } from '../main';

// Font Loader
const fontLoader = new FontLoader();

// Font
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

export const extrudeSettings = {
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
export const backboard = new THREE.Mesh(geometry, material);
backboard.position.set(-3, 0.2, -0.15);