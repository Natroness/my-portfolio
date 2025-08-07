import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'

function PorscheModel() {
  const gltf = useGLTF('/porsche.glb') // Make sure this path is correct

  return <primitive object={gltf.scene} scale={0.5} />
}

export default function CarShowcase() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <PorscheModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
