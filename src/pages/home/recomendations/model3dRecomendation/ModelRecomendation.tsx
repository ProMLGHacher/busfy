import { OrbitControls } from '@react-three/drei'
import { useLoader, Canvas } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/Addons.js'
import { Recomendation as RecomendationType } from '../../../../shared/api/posts/recomendations'
import { Recomendation } from '../Recomendation'

const ModelRecomendation = (props: RecomendationType) => {

    const fbx = useLoader(FBXLoader, props.urlFile || '')

    return (
        <Recomendation categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <Canvas
                style={{
                    aspectRatio: '1/1',
                    width: '100%',
                    minWidth: '0px'
                }}
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
        </Recomendation>
    )
}

export default ModelRecomendation