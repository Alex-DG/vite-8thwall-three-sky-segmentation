import textureSrc from '../../assets/textures/space.png'

export const initWorldPipelineModule = () => {
  let skyBox

  const initSkyScene = ({ scene, renderer }) => {
    renderer.outputEncoding = THREE.sRGBEncoding

    // Add soft white light to the scene.
    scene.add(new THREE.AmbientLight(0x404040, 7))

    // Add sky dome.
    const skyGeo = new THREE.SphereGeometry(1000, 25, 25)

    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(textureSrc)
    texture.encoding = THREE.sRGBEncoding
    texture.mapping = THREE.EquirectangularReflectionMapping
    const skyMaterial = new THREE.MeshPhongMaterial({
      map: texture,
      toneMapped: true,
    })

    skyBox = new THREE.Mesh(skyGeo, skyMaterial)
    skyBox.material.side = THREE.BackSide
    scene.add(skyBox)
    skyBox.visible = false

    console.log('✨', 'World ready')
  }

  const update = () => {}

  const layerFound = ({ detail }) => {
    console.log('FOUND', { detail })

    if (detail?.name === 'sky') {
      XR8.LayersController.recenter()
      skyBox.visible = true
    }
  }

  return {
    name: 'init-world',

    onStart: () => {
      const { layerScenes, camera, renderer } = XR8.Threejs.xrScene()
      initSkyScene({ scene: layerScenes.sky.scene, camera, renderer })

      // Set the initial camera position
      camera.position.set(0, 3, 0)

      // Sync the xr controller's 6DoF position and camera paremeters with our scene.
      XR8.LayersController.configure({
        coordinates: {
          origin: {
            position: camera.position,
            rotation: camera.quaternion,
          },
        },
      })

      // Prevent scroll/pinch gestures on canvas
      canvas.addEventListener('touchmove', (event) => {
        event.preventDefault()
      })

      // Prevent double tap zoom
      document.ondblclick = function (e) {
        e.preventDefault()
      }
    },

    onAttach: () => {},

    onUpdate: () => update(),

    listeners: [{ event: 'layerscontroller.layerfound', process: layerFound }],
  }
}
