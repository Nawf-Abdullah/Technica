import './Anatomy.css'
import React, { useRef,Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { Stats } from "@react-three/drei";

function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('../../Model/muscle/scene.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.02, 0.5, 1.3]} rotation={[-Math.PI, 0, -Math.PI]}>
        <group position={[0.02, -0.5, -1.3]}>
          <mesh material={materials.White} geometry={nodes['buffer-0-mesh-0'].geometry} />
          <mesh material={materials.Red} geometry={nodes['buffer-0-mesh-0_1'].geometry} />
          <mesh material={materials.Gray} geometry={nodes['buffer-0-mesh-0_2'].geometry} />
          <mesh material={materials.Black} geometry={nodes['buffer-0-mesh-0_3'].geometry} />
        </group>
      </group>
      <primitive object={nodes['']} />
      <primitive object={nodes.keyLightNode} />
    </group>
  )
}

useGLTF.preload('../../Model/muscle/scene.gltf')


const Anatomy = () => (
    <Canvas style={{ height: 400, width: 800 }}>
      <pointLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
      <Stats />
    </Canvas>
  );

export default Anatomy