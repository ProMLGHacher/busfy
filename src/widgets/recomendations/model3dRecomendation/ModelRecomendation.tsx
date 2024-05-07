import { Post as RecomendationType } from "../../../shared/api/posts/recomendations"
import { Recomendation } from '../Recomendation'
import ModelPreview from '../../preview/model3dPreview/ModelPreview'

const ModelRecomendation = (props: RecomendationType) => {

    return (
        <Recomendation id={props.id} categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <ModelPreview {...props} />
        </Recomendation>
    )
}

export default ModelRecomendation