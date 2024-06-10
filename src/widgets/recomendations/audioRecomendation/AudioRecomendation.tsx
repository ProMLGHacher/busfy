import { Post as RecomendationType } from "../../../features/api/posts/recomendations"
import { Recomendation } from "../Recomendation"
import { AudioPreview } from '../../preview/audioPreview/AudioPreview'

export const AudioRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation {...props}>
            <AudioPreview {...props} />
        </Recomendation>
    )
}

