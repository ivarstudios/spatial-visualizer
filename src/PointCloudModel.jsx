import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function PointCloudModel({ url, onScaleInfo }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()

  useEffect(() => {
    // Traverse the loaded scene and ensure vertex colors are enabled
    // but preserve the original material from the GLB as much as possible
    scene.traverse((child) => {
      if (child.isMesh || child.isPoints) {
        const geometry = child.geometry

        if (geometry.attributes.color && child.material) {
          // Just enable vertex colors on the existing material
          child.material.vertexColors = true
          child.material.needsUpdate = true
        }
      }
    })

    // Center and scale the model to fit the viewport
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(groupRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)

      // Center the group
      groupRef.current.position.set(-center.x, -center.y, -center.z)

      // Scale to a reasonable viewing size if needed
      if (maxDim > 0) {
        const scale = 3 / maxDim
        groupRef.current.scale.setScalar(scale)
        groupRef.current.position.multiplyScalar(scale)

        // Report scale info back so we can draw a scale bar
        // GLB units are meters, so metersPerUnit = 1/scale
        if (onScaleInfo) {
          onScaleInfo({ metersPerUnit: 1 / scale, rawSize: { x: size.x, y: size.y, z: size.z } })
        }
      }
    }
  }, [scene])

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/260227-Rivermeet-Pointcloud_262k_cleaned.glb')
