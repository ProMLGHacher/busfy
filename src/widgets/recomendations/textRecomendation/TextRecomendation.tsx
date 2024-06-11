import { Post as RecomendationType } from "../../../features/api/posts/recomendations"
import { Recomendation } from "../Recomendation"
import { TextPreview } from '../../preview/textPreview/TextPreview'

export const TextRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation {...props}>
            <TextPreview {...props} />
        </Recomendation>
    )
}

