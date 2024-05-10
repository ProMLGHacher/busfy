import { $api } from "../../../shared/api/api"

export type NewPost = {
    description: string,
    text?: string,
    subscriptionId: string,
    isCommentingAllowed?: boolean,
    file?: File,
    category: string
}

export const publishNewPost = async ({ description, file, subscriptionId, text, category }: NewPost): Promise<boolean> => {
    try {
        const res = await $api.post<string>(`/api/post`, {
            "description": description,
            "text": text || null,
            "subscriptionId": subscriptionId,
            "isCommentingAllowed": true
        }, {
            params: {
                categoryName: category
            }
        })
        if (!file) return false

        const formData = new FormData()
        formData.append('file', file)
        $api.post('/api/upload/post', formData, {
            params: {
                postId: res.data
            }
        })
    } catch (error) {
        return false
    }
    return true
}