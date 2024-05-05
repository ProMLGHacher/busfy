import { OrbitControls } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { FBXLoader } from "three/examples/jsm/Addons.js"

export const Test = () => {

    const fbx = useLoader(FBXLoader, '/InteriorTest.fbx')

    return (
        <Canvas
            style={{
                height: '100dvh',
                width: '100%'
            }}
            camera={{ position: [0, 100, 100], fov: 40, rotation: [0, 1, 0] }}
        >
            <color attach="background" args={['#333']} />
            <ambientLight intensity={1} />
            <mesh position={[0, 0, 0]} scale={0.1} >
                <primitive object={fbx}/>
            </mesh>
            <OrbitControls makeDefault />
        </Canvas>
    )
}