import { Recomendation as RecomendationType } from "../../../../shared/api/posts/recomendations"
import { Recomendation } from "../Recomendation"

export const ImageRecomendation = (props: RecomendationType) => {
    return (
        <Recomendation categoryName={props.categoryName} hasEvaluated={props.hasEvaluated} urlFile={props.urlFile} description={props.description}>
            <img src={props.urlFile || ''} alt={props.description || ''} />
        </Recomendation>
    )
}

