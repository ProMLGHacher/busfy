import { Post as RecomendationType } from "../../../shared/api/posts/recomendations"
import { Recomendation } from "../Recomendation"
import { VideoPreview } from '../../preview/videoPreview/VideoPreview'

export const VideoRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation id={props.id} categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <VideoPreview {...props} />
        </Recomendation>
    )
}

