// Imports
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Components
import { scrollTagGroup } from '../../main'

// Font Loader
const fontLoader = new FontLoader();

let tagText;
// Scroll Font
fontLoader.load(
  '/fonts/Comfortaa_Regular.json',
  (comfortaa) => {
    const tagtextGeometry = new TextGeometry(
    `SCROLL DOWN`, {
      size: 0.3,
      height: 0.2,
      font: comfortaa
    });
    const tagtextMaterial = new THREE.MeshBasicMaterial({ color: 0xf61E8E1 });
    const tagtextMesh = new THREE.Mesh(tagtextGeometry, tagtextMaterial);
    tagText = tagtextMesh
    tagtextMesh.position.set(-1.8, 0, 0)
    scrollTagGroup.add(tagtextMesh)
  }
)

export default tagText