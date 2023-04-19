import logo from './logo.svg';
import './App.css';
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'

function App() {
  function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += delta))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1 : 1.2}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={hovered ? 'coral' : 'orange'} />
      </mesh>
    )
  }
  function Scene() {

    const [hovered, hover] = useState(false)
    const ref = useRef()
    const gltf = useLoader(GLTFLoader, 'gltf/ForestHouse/scene.gltf')

    useFrame((state, delta) => ( hover ? ref.current.rotation.y += delta/10 : 0 ))

    return( 
      <primitive 
        ref={ref}
        object={gltf.scene} 
        scale={30}
        position={[0, -1.75, 0]}

        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    )
    
  }
  function Model() {
    const [hovered, hover] = useState(false)
    const ref = useRef()
    //https://cdn.jsdelivr.net/gh/*USER*/*REPO*@VERSION*/*FILEPATH*
    //20mb file limit
    //EX: https://cdn.jsdelivr.net/gh//Nando123mad/MyRepo@master/publicfolder/asset/myasset.gltf
    //https://cdn.filestackcontent.com/A6HyqbKrrRoChUMHrEELHz/http://dl.dropboxusercontent.com/s/ueuee7ur3bqb2xs/sig_p320_desktop_v1.gltf?dl=0
    //https://cdn.jsdelivr.net/gh/Nando123mad/gltfHolder/SigGun/sig.gltf
    const { scene } = useGLTF('https://cdn.filestackcontent.com/A6HyqbKrrRoChUMHrEELHz/http://dl.dropboxusercontent.com/s/ueuee7ur3bqb2xs/sig_p320_desktop_v1.gltf?dl=0')
    


    useFrame((state, delta) => //( hover ? ref.current.rotation.y += delta/10 : 0 ))
    {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.z = -0.2 - (1+Math.sin(t / 1.5)) / 20
      ref.current.rotation.x = Math.cos(t / 4) / 10
      ref.current.rotation.y = Math.sin(t / 4) / 8 - 80.15 // end part is for overall rotation
      ref.current.position.y = ((Math.sin(t / 1.5)) /10) - 2//end part is for overall position
    })

    return(
      <primitive 
        ref={ref}
        object={scene} 
        scale={30}
        position={[-2, 0, 0]}

        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
      )
  }

  // createRoot(document.getElementById('root')).render(
  //   <Canvas className='Canvas'>
  //     <ambientLight />
  //     <pointLight position={[10, 10, 10]} />
  //     <Box position={[-1.2, 0, 0]} />
  //     <Box position={[1.2, 0, 0]} />
  //   </Canvas>
  // )

  return (
    <div className="App">
      createRoot(document.getElementById('root')).render(
        <Canvas className='Canvas'>
          <ambientLight />
          <pointLight position={[0, 10, 10]} />
          {/* <Box position={[-2.2, 0, 0]} />
          <Box position={[0, 0, 0]} />
          <Box position={[2.2, 0, 0]} /> */}
          {/* <Scene/> */}
          <Model/>
        </Canvas>
      )
      
    </div>
  );
}

export default App;
