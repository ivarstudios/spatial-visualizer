import { useMemo } from 'react'
import * as THREE from 'three'

/**
 * Renders a ground-plane grid where each square = 1km × 1km.
 * Sits just below the model so it doesn't clip through the point cloud.
 *
 * Props:
 *   metersPerUnit — how many real-world meters one viewer unit represents
 *   darkMode      — adjusts grid color
 */
export default function ScaleGrid({ metersPerUnit, darkMode }) {
  const grid = useMemo(() => {
    const kmPerUnit = metersPerUnit / 1000
    // Size of 1km in viewer units
    const cellSize = 1000 / metersPerUnit
    // Cover roughly 10km × 10km
    const gridExtent = 10000 / metersPerUnit
    const halfExtent = gridExtent / 2
    const divisions = Math.round(gridExtent / cellSize)

    const points = []

    // Lines along X axis
    for (let i = 0; i <= divisions; i++) {
      const z = -halfExtent + i * cellSize
      points.push(new THREE.Vector3(-halfExtent, 0, z))
      points.push(new THREE.Vector3(halfExtent, 0, z))
    }

    // Lines along Z axis
    for (let i = 0; i <= divisions; i++) {
      const x = -halfExtent + i * cellSize
      points.push(new THREE.Vector3(x, 0, -halfExtent))
      points.push(new THREE.Vector3(x, 0, halfExtent))
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    return { geometry, cellSize, divisions }
  }, [metersPerUnit])

  const color = darkMode ? '#333355' : '#b0b0c0'

  // Offset 400m below the model origin
  const yOffset = -(400 / metersPerUnit)

  return (
    <group position={[0, yOffset, 0]}>
      <lineSegments geometry={grid.geometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}
