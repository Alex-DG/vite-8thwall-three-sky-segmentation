class _Lights {
  setAmbientLight() {
    this.skyScene.add(new THREE.AmbientLight(0x404040, 7))
  }

  init() {
    const { skyScene } = XR8.Threejs.xrScene()
    this.skyScene = skyScene
    this.setAmbientLight()
  }
}

const Lights = new _Lights()
export default Lights
