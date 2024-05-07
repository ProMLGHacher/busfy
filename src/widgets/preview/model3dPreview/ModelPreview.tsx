import { OrbitControls } from '@react-three/drei'
import { useLoader, Canvas } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { Post as RecomendationType } from "../../../shared/api/posts/recomendations"
import styles from './ModelPreciew.module.scss'

const ModelPreview = (props: RecomendationType) => {

    const fbx = useLoader(FBXLoader, props.urlFile || '')

    return (
        <Canvas
            className={styles.wrp}
            camera={{ position: [0, 100, 100], fov: 40, rotation: [0, 1, 0] }}
        >
            <color attach="background" args={['#444']} />
            <ambientLight intensity={1} />
            <directionalLight intensity={0.5} position={[1, 1, 1]} />
            <mesh position={[0, 0, 0]} scale={0.1} >
                <primitive object={fbx} />
            </mesh>
            <OrbitControls makeDefault />
        </Canvas>
    )
}

export default ModelPreview