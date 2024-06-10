import { Post as RecomendationType } from "../../../features/api/posts/recomendations"
import { ImagePreview } from "../../preview/imagePreview/ImagePreview"
import { Recomendation } from "../Recomendation"

export const ImageRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation {...props}>
            <ImagePreview {...props} />
        </Recomendation>
    )
}

