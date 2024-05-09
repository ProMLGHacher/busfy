import { Post as RecomendationType } from "../../../features/api/posts/recomendations"
import { Recomendation } from "../Recomendation"
import { TextPreview } from '../../preview/textPreview/TextPreview'

export const TextRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation id={props.id} categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description} downloadLink={props.urlFile}>
            <TextPreview {...props} />
        </Recomendation>
    )
}

