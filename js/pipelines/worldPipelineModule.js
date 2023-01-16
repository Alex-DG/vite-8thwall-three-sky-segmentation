import Lights from '../experience/Lights'
import Sky from '../experience/Sky'

export const initWorldPipelineModule = () => {
  let skyBox

  const init = ({ scene, renderer }) => {
    renderer.outputEncoding = THREE.sRGBEncoding

    Lights.init({ scene })
    Sky.init({ scene })

    console.log('✨', 'Sky ready')
  }

  const update = () => {}

  const layerFound = ({ detail }) => {
    if (detail?.name === 'sky') {
      XR8.LayersController.recenter()
      Sky.show()
    }
  }

  return {
    name: 'init-world',

    onStart: () => {
      const { layerScenes, camera, renderer } = XR8.Threejs.xrScene()
      const scene = layerScenes.sky.scene

      init({ scene, camera, renderer })

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
