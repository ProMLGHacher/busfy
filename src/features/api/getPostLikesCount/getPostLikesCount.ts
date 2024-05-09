import { $api } from "../../../shared/api/api"

export const getPostLikesCount = async (id: string): Promise<number> => {
    const response = await $api.get<{ count: number }>(`/api/post/likes`, {
        params: {
            postId: id
        }
    })
    return response.data.count
}