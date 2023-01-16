class _Lights {
  init({ scene }) {
    // Add soft white light to the scene.
    scene.add(new THREE.AmbientLight(0x404040, 7))
  }
}

const Lights = new _Lights()
export default Lights
