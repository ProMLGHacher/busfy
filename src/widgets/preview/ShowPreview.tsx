import { Post, PostType } from "../../shared/api/posts/recomendations"
import { AudioPreview } from "./audioPreview/AudioPreview"
import { ImagePreview } from "./imagePreview/ImagePreview"
import ModelPreview from "./model3dPreview/ModelPreview"
import { TextPreview } from "./textPreview/TextPreview"
import { VideoPreview } from "./videoPreview/VideoPreview"


export const ShowPreview = (props: Post & { videoControls?: boolean }) => {

    if (props.type === PostType.Image) {
        return <ImagePreview {...props} />
    }
    else if (props.type === PostType.Video) {
        return <VideoPreview controls={props.videoControls ?? false} {...props} />
    }
    else if (props.type === PostType.Text) {
        return <TextPreview {...props} />
    }
    else if (props.type === PostType.Audio) {
        return <AudioPreview {...props} />
    }
    else if (props.type === PostType.Model3D) {
        return <ModelPreview {...props} />
    }
    else {
        return <></>
    }
}
