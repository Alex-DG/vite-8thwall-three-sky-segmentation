import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class _AirshipModel {
  async loadGLB(source = '/models/airship.glb') {
    try {
      const loader = new GLTFLoader()
      const model = await loader.loadAsync(source)

      const airshipLoadedModel = model.scene

      this.instance = airshipLoadedModel
      this.airshipPositioningPivot.add(airshipLoadedModel)

      // Animate the model
      this.airshipAnimationMixer = new THREE.AnimationMixer(airshipLoadedModel)
      const idleClip = model.animations[0]
      const idleClipAction = this.airshipAnimationMixer.clipAction(
        idleClip.optimize()
      )
      idleClipAction.play()

      // Config
      const horizontalDegrees = -25 // Higher number moves model right (in degrees)
      const verticalDegrees = 30 // Higher number moves model up (in degrees)
      const modelDepth = 35 // Higher number is further depth.

      airshipLoadedModel.position.set(0, 0, -modelDepth)
      airshipLoadedModel.rotation.set(0, 0, 0)
      airshipLoadedModel.scale.set(10, 10, 10)
      airshipLoadedModel.castShadow = true

      // Converts degrees into radians and adds a negative to horizontalDegrees to rotate in the direction we want
      this.airshipPositioningPivot.rotation.y =
        -horizontalDegrees * (Math.PI / 180)
      this.airshipPositioningPivot.rotation.x =
        verticalDegrees * (Math.PI / 180)

      this.isReady = true
    } catch (error) {
      console.log('airship-load-error', { error })
    }
  }

  init() {
    const { skyScene } = XR8.Threejs.xrScene()
    this.skyScene = skyScene

    this.airshipPositioningPivot = new THREE.Group()
    this.clock = new THREE.Clock()

    this.skyScene.add(this.airshipPositioningPivot)

    this.isReady = false

    this.loadGLB()
  }

  update() {
    if (!this.isReady) return

    const d = this.clock.getDelta()
    this.airshipAnimationMixer.update(d)
  }
}

const AirshipModel = new _AirshipModel()
export default AirshipModel
