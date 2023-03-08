import AirshipModel from '../classes/AirshipModel'
import Lights from '../classes/Lights'
import Sky from '../classes/Sky'

export const initWorldPipelineModule = () => {
  const config = ({ layerScenes, renderer, camera, canvas }) => {
    XR8.Threejs.xrScene().skyScene = layerScenes.sky.scene

    renderer.outputEncoding = THREE.sRGBEncoding

    // Set the initial camera position
    camera.position.set(0, 0, 0)

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
  }

  const start = () => {
    Lights.init()
    Sky.init()
    AirshipModel.init()

    console.log('⭐️', 'Sky ready')
  }

  const render = () => {}

  const layerFound = ({ detail }) => {
    if (detail?.name === 'sky') {
      XR8.LayersController.recenter()

      Sky.show()
      AirshipModel.show()
    }
  }

  return {
    name: 'world',

    onStart: ({ canvas }) => {
      const { layerScenes, camera, renderer } = XR8.Threejs.xrScene()

      config({ renderer, camera, layerScenes, canvas })

      start()
    },

    onAttach: () => {},

    onRender: () => render(),

    listeners: [{ event: 'layerscontroller.layerfound', process: layerFound }],
  }
}
