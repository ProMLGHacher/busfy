import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../shared/api/api";
import { AccountStatus, UserRole } from "./authSlice";

type GetUserFullfiled = {
    "profile": {
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
    "subscriberCount": number,
    "countLikes": number
}

export const getUserThunk = createAsyncThunk<
    GetUserFullfiled,
    void,
    { rejectValue: string }
>("getUserThunk", async (_, { rejectWithValue }) => {
    try {
        const result = await $api.get<GetUserFullfiled>('/api/profile')
        return result.data
    } catch (error) {
        return rejectWithValue("Произошла неизвестная ошибка позвоните разработчику 89878884054")
    }
})

