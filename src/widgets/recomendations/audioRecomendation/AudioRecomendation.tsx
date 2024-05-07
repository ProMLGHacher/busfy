import { Post as RecomendationType } from "../../../shared/api/posts/recomendations"
import { Recomendation } from "../Recomendation"
import { AudioPreview } from '../../preview/audioPreview/AudioPreview'

export const AudioRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation id={props.id} categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <AudioPreview {...props} />
        </Recomendation>
    )
}

