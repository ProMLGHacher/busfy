import { Post as RecomendationType } from "../../../features/api/posts/recomendations"
import { Recomendation } from '../Recomendation'
import ModelPreview from '../../preview/model3dPreview/ModelPreview'

const ModelRecomendation = (props: RecomendationType) => {

    return (
        <Recomendation {...props}>
            <ModelPreview {...props} />
        </Recomendation>
    )
}

export default ModelRecomendation