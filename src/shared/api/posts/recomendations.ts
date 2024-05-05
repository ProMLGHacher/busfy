import { AccountStatus, UserRole } from "../../../features/authorization/authSlice";
import { $api } from "../api";

export enum PostType {
    Text = "Text",
    Video = "Video",
    Audio = "Audio",
    Image = "Image",
    Model3D = "Model3D",
    Other = "Other"
}

export type Recomendation = {
    "id": string,
    "description": string | null,
    "text": string | null,
    "type": PostType,
    "categoryName": string | null,
    "isCommentingAllowed": boolean,
    "date": Date,
    "urlFile": string | null,
    "profileCreator": {
        "id": string,
        "email": string | null,
        "role": UserRole,
        "urlIcon": string | null,
        "urlBackgroundImage": string | null,
        "nickname": string | null,
        "bio": string | null,
        "userTag": string | null,
        "accountStatus": AccountStatus
    },
    "hasEvaluated": boolean
}

export type RecomendationsResponse = {
    "count": number,
    "offset": number,
    "total": number,
    "items": Recomendation[]
}

export const getRecomendations = async (count: number = 9999, offset: number = 0, categoryName?: string | undefined): Promise<RecomendationsResponse> => {
    const response = !categoryName ? await $api.get<RecomendationsResponse>('/api/tape/recommendations', { params: { count, offset } }) : await $api.get<RecomendationsResponse>('/api/tape/category', { params: { count, offset, name: categoryName } })
    return response.data
}

