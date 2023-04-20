import logo from './logo.svg';
import './App.css';
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import BoxMui from '@mui/material/Box';
import * as THREE from 'three'
import { Stats, OrbitControls, Environment, useGLTF, Html, useProgress, Lightformer, Float } from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'

function App() {

  //Loading Model UI
  function CustomLoader() {
    const { progress } = useProgress()
    return (
      <Html center>
        <BoxMui sx={{position: 'relative', display: 'inline-flex' }}>
          <CircularProgress color="primary" size={70}/>
          <BoxMui
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="caption" component="div" color="primary">
            {`${Math.round(progress)}%`}
            </Typography>
          </BoxMui>
        </BoxMui>
      </Html>
    )
  }
  //Lighting Environment
  function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
    const group = useRef()
    useFrame((state, delta) => (group.current.position.z += delta * 1) > 20 && (group.current.position.z = -60))
    return (
      <>
        {/* Ceiling */}
        <Lightformer intensity={0.75} rotation-x={Math.PI / 2} position={[0-2, 5, -9]} scale={[10, 10, 1]} />
        <group rotation={[0, 0.5, 0]}>
          <group ref={group}>
            {positions.map((x, i) => (
              <Lightformer key={i} form="circle" intensity={5} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[3, 1, 1]} />
            ))}
          </group>
        </group>
        {/* Sides */}
        <Lightformer intensity={4} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
        <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
        <Lightformer color="red"  rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
        {/* Accent (blue) */}
        <Float speed={5} floatIntensity={2} rotationIntensity={2}>
          <Lightformer form="ring" color="orange" intensity={1} scale={10} position={[-15, 4, -18]} target={[0, 0, 0]} />
        </Float>
        {/* Background */}
        <mesh scale={100}>
          <sphereGeometry args={[1, 32, 32]} />
          <LayerMaterial side={THREE.BackSide}>s
            <Color color="#fff" alpha={1} mode="normal" />
            <Depth colorA="#blue" colorB="black" alpha={0.5} mode="normal" near={0} far={300} origin={[0, 100, 100]} />
          </LayerMaterial>
        </mesh>
      </>
    )
  }
  //Geometry
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
    //20mb file limit using jsdelivr
    //EX: https://cdn.jsdelivr.net/gh//Nando123mad/MyRepo@master/publicfolder/asset/myasset.gltf
    //https://cdn.filestackcontent.com/A6HyqbKrrRoChUMHrEELHz/http://dl.dropboxusercontent.com/s/ueuee7ur3bqb2xs/sig_p320_desktop_v1.gltf?dl=0
    //https://cdn.jsdelivr.net/gh/Nando123mad/threejs_modelconfig@useGLTF/models/Duck/glTF/Duck.gltf
    //https://cdn.jsdelivr.net/gh/Nando123mad/threejs_modelconfig@useGLTF/models/sig_mobile_v2/GLB/sig_p320_mobile_v2.glb
    //https://cdn.jsdelivr.net/gh/Nando123mad/threejs_modelconfig@useGLTF/models/sig_desktop_v2/GLB/sig_p320_desktop_v2.glb
    //http://dl.dropboxusercontent.com/s/5vrfxhpnht1thaj/sig_p320_desktop_v1.glb?dl=0
    // const { LOWER } = useGLTF('https://cdn.jsdelivr.net/gh/Nando123mad/threejs_modelconfig@useGLTF/models/sid_desktop_v2_parts/sig_p320_Lower_desktop_v1.glb')
    // const { UPPER } = useGLTF('https://cdn.jsdelivr.net/gh/Nando123mad/threejs_modelconfig@useGLTF/models/sid_desktop_v2_parts/sig_p320_Upper_desktop_v1.glb')
    const {scene} = useGLTF('https://cdn.jsdelivr.net/gh/Nando123mad/threejs_modelconfig@useGLTF/models/sig_desktop_v2/GLB/sig_p320_desktop_v2.glb')
    


    useFrame((state, delta) => //( hover ? ref.current.rotation.y += delta/10 : 0 ))
    {
      const t = state.clock.getElapsedTime()
      ref.current.rotation.z = 0.0 - (1+Math.sin(t / 1.5)) / 20
      ref.current.rotation.x = Math.cos(t / 4) / 10
      ref.current.rotation.y = Math.sin(t / 4) / 8 - 80.15 // end part is for overall rotation
      ref.current.position.y = ((Math.sin(t / 1.5)) /10) - 2.25//end part is for overall position
    })

    return(
      <primitive 
        ref={ref}
        object = {scene}
        scale={30}
        position={[-2, 0, 0]}//yposition controlled in useFrame

        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      />
    )
  }

  return (
    <div className="App">
        <Canvas className='Canvas'>
          <ambientLight />
          <OrbitControls />
          <Environment frames={Infinity} resolution={256} background blur={1}>
            <Lightformers />
          </Environment>
          <pointLight position = {[0, 10, 100]} />
          {/* <Box position={[-2.2, 0, 0]} />
          <Box position={[0, 0, 0]} />
          <Box position={[2.2, 0, 0]} /> */}
          {/* <Scene/> */}
          <React.Suspense fallback={<CustomLoader/>}>
            <Model/>
          </React.Suspense>
        </Canvas>
    </div>
  )
}

export default App;
