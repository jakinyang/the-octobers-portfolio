// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { darrenTagGroup } from '../../main';
import { darrenNameGroup } from '../../main';
import { extrudeSettings } from '../titleBoard';

// Font Loader
const fontLoader = new FontLoader();

// Profile Cube
const darren = new THREE.TextureLoader().load('../../avatars/darren.png');

export const darrenCube = new THREE.Mesh(
  new THREE.BoxGeometry(4, 4, 4),
  new THREE.MeshStandardMaterial({
    color: 0x3b4554,
    map: darren
  })
);

darrenCube.position.set(-15, -1, 60);

// Tag Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `
    DOG OWNER
    VIDEO GAMER
    GOLF LOVER`, {
      size: 1,
      height: 0.2,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0x862809 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagtextMesh.position.set(-5, 2, 0)
    darrenTagGroup.add(tagtextMesh);
  }
)
// Name Font
fontLoader.load(
  '../../fonts/Contrail_One_Regular.json',
  (contrail) => {
    const nametextGeometry = new TextGeometry(
    `DARREN LIN`, {
      size: 1,
      height: 0.4,
      font: contrail
    });
    const nametextMaterial = new THREE.MeshBasicMaterial({ color: 0x605406 });
    const darrenMesh = new THREE.Mesh(nametextGeometry, nametextMaterial);
    darrenMesh.position.set(-3.5, 0, 0)
    darrenNameGroup.add(darrenMesh);
  }
)

// Backboard
const backboardLength = 6, backboardWidth = 1;

const backboardShape = new THREE.Shape();
backboardShape.moveTo(0, 0);
backboardShape.lineTo(0, backboardWidth);
backboardShape.lineTo(backboardLength, backboardWidth);
backboardShape.lineTo(backboardLength, 0);
backboardShape.lineTo(0, 0);

const backboardGeometry = new THREE.ExtrudeGeometry(backboardShape, extrudeSettings);
const backboardMaterial = new THREE.MeshBasicMaterial({ color: 0x0C312F });
export const darrenBoard = new THREE.Mesh(backboardGeometry, backboardMaterial);
darrenBoard.position.set(-3.5, 0, 0);