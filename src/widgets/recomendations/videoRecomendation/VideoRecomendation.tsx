import { Post as RecomendationType } from "../../../features/api/posts/recomendations"
import { Recomendation } from "../Recomendation"
import { VideoPreview } from '../../preview/videoPreview/VideoPreview'

export const VideoRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation {...props}>
            <VideoPreview {...props} />
        </Recomendation>
    )
}

