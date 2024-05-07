import { Post as RecomendationType } from "../../../shared/api/posts/recomendations"
import { ImagePreview } from "../../preview/imagePreview/ImagePreview"
import { Recomendation } from "../Recomendation"

export const ImageRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation id={props.id} categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <ImagePreview {...props} />
        </Recomendation>
    )
}

