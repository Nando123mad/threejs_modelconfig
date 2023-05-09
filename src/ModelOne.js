
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
    GizmoHelper, 
    GizmoViewport, 
    Grid, 
    Stats, 
    OrbitControls, 
    Environment, 
    useGLTF, 
    useTexture, 
    Html, 
    useProgress, 
    Lightformer, 
    Float, 
    useAnimations, 
    useHelper,
    AdaptiveDpr,
    AdaptiveEvents
  } from '@react-three/drei'

function App() {
    function Models() {
        const [hovered, hover] = useState(false)
        const ref = useRef()
        const {scene, animations, names} = useGLTF('https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/models/hammer.glb')

    
        useFrame((state, delta) => //( hover ? ref.current.rotation.y += delta/10 : 0 ))
        {
          const t = state.clock.getElapsedTime()
          ref.current.rotation.z = 0.0 - (1+Math.sin(t / 1.5)) / 20
          ref.current.rotation.x = Math.cos(t / 4) / 10
          ref.current.rotation.y = Math.sin(t / 4) / 8 + 2 // end part is for overall rotation
          ref.current.position.y = ((Math.sin(t / 1.5)) /10) + 0.5//end part is for overall position
        }) 

        return(
          <primitive 
            ref={ref}
            object = {scene}
            scale={10}
            position={[0.75, 0.75, 0]}//yposition controlled in useFrame
            rotation={[0,1.55,0]}//0,1.55,-1.5]}
          >
          </primitive>
        )
      }
    return(
        <Models/>
    )
}

export default App;