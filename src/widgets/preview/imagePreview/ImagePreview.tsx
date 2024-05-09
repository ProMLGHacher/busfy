import { Post as RecomendationType } from "../../../features/api/posts/recomendations"

export const ImagePreview = (props: RecomendationType) => {
    return (
            <img src={props.urlFile || ''} alt={props.description || ''} />
    )
}

