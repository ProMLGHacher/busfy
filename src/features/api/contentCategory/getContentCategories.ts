import { $api } from "../../../shared/api/api";

export type ContentCategory = {
    name: string;
    urlImage: string;
}

type Response = {
    count: number;
    offset: number;
    total: number;
    items: ContentCategory[];
  }

export const getContentCategories = async (count: number = 9999, offset: number = 0): Promise<ContentCategory[]> => {
    const res = await $api.get<Response>('/api/content-categories', {
        params: {
            count,
            offset
        }
    })
    return res.data.items;
}

