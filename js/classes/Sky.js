class _Sky {
  show() {
    this.instance.visible = true
  }

  hide() {
    this.instance.visible = false
  }

  ///////////////////////////////////////////////////////////////////////////

  async load(source = '/textures/space.png') {
    try {
      // Add sky dome.
      const skyGeo = new THREE.SphereGeometry(1000, 25, 25)

      const textureLoader = new THREE.TextureLoader()
      const texture = await textureLoader.loadAsync(source)
      texture.encoding = THREE.sRGBEncoding
      texture.mapping = THREE.EquirectangularReflectionMapping
      const skyMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        toneMapped: true,
      })

      const skyBox = new THREE.Mesh(skyGeo, skyMaterial)
      skyBox.material.side = THREE.BackSide

      this.skyScene.add(skyBox)
      this.instance = skyBox
      console.log({ skyBox })
      this.hide()
    } catch (error) {
      console.error('load-texture', { error })
    }
  }

  ///////////////////////////////////////////////////////////////////////////

  init() {
    const { skyScene } = XR8.Threejs.xrScene()
    this.skyScene = skyScene

    this.load()
  }
}

const Sky = new _Sky()
export default Sky
