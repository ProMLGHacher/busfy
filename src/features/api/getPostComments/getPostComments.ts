import { $api } from "../../../shared/api/api"
import { AccountStatus, UserRole } from "../../authorization/authSlice"

export type Comment = {
    "profileBody": {
        "id": string,
        "email": string,
        "role": UserRole,
        "urlIcon": string,
        "urlBackgroundImage": string,
        "nickname": string,
        "bio": string,
        "userTag": string,
        "accountStatus": AccountStatus
    },
    "comment": string
}

type CommentsResponce = {
    "count": number,
    "offset": number,
    "total": number,
    "items": Comment[]
}

export const getPostComments = async (id: string): Promise<Comment[]> => {
    const response = await $api.get<CommentsResponce>(`/api/comments`, {
        params: {
            postId: id,
            count: 9999,
        }
    })
    return response.data.items
}