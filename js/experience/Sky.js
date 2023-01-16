import textureSrc from '../../assets/textures/space.png'

class _Sky {
  show() {
    this.instance.visible = true
  }

  hide() {
    this.instance.visible = false
  }

  ///////////////////////////////////////////////////////////////////////////

  async load() {
    try {
      // Add sky dome.
      const skyGeo = new THREE.SphereGeometry(1000, 25, 25)

      const textureLoader = new THREE.TextureLoader()
      const texture = await textureLoader.loadAsync(textureSrc)
      texture.encoding = THREE.sRGBEncoding
      texture.mapping = THREE.EquirectangularReflectionMapping
      const skyMaterial = new THREE.MeshPhongMaterial({
        map: texture,
        toneMapped: true,
      })

      const skyBox = new THREE.Mesh(skyGeo, skyMaterial)
      skyBox.material.side = THREE.BackSide

      this.scene.add(skyBox)
      this.instance = skyBox
      this.hide()
    } catch (error) {
      console.error('load-texture', { error })
    }
  }

  ///////////////////////////////////////////////////////////////////////////

  init({ scene }) {
    this.scene = scene

    this.load()
  }
}

const Sky = new _Sky()
export default Sky
