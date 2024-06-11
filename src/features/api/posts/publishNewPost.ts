import { $api } from "../../../shared/api/api"

export type NewPost = {
    description: string,
    text?: string,
    subscriptionId?: string,
    isCommentingAllowed?: boolean,
    file?: File,
    category: string
}

export const publishNewPost = async ({ description, file, subscriptionId, text, category }: NewPost): Promise<boolean> => {
    try {
        const res = await $api.post<{ id: string }>(`/api/post`, {
            "description": description,
            "text": text || null,
            "subscriptionId": subscriptionId || null,
            "isCommentingAllowed": true
        }, {
            params: {
                categoryName: category
            }
        })
        if (!file) return false

        console.log(res.data);


        const formData = new FormData()
        formData.append('file', file)
        await $api.post('/api/upload/post', formData, {
            params: {
                "postId": res.data.id
            }
        })
    } catch (error) {
        alert('Ошибка публикации')
        return false
    }
    return true
}