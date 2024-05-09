import { $api } from "../../../shared/api/api"
import { Post } from "./recomendations"

export const getPostById = async (id: string): Promise<Post> => {
    const response = await $api.get<Post>(`/api/post/${id}`)
    return response.data
}