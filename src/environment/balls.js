import * as THREE from 'three';
import { scene } from '../../main';

// Balls
export const addBall = () => {
  
  const ballGeometry = new THREE.IcosahedronGeometry(1, 15);
  const color = new THREE.Color();
  color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

  const ballMaterial = new THREE.MeshBasicMaterial({ color: color });
  const sphere = new THREE.Mesh(ballGeometry, ballMaterial);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(700));
  sphere.position.set(x, y, z);
  sphere.scale.setScalar(Math.random() * Math.random() + 0.5);
  scene.add(sphere);

}