export const oscillateTitle = (group) => {
  group.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  group.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  group.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
}
export const oscillateTag = (group) => {
  group.rotation.z = Math.sin(Date.now() * -0.001) * Math.PI * 0.05;
  group.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.005;
  group.rotation.x = Math.sin(Date.now() * -0.001) * Math.PI * 0.01;
}

export const oscillateName = (group) => {
  group.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.05;
  group.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  group.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
}

export const rotate = (group) => {
  group.rotation.x += 0.0001;
  group.rotation.y += 0.003;
  group.rotation.z += 0.0001;
}
