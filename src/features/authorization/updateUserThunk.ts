import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../shared/api/api";
import { UserRole, AccountStatus } from "./authSlice";


type UpdateUserFullfiled = {
    id: string
    "email": string,
    "role": UserRole,
    "urlIcon": string | null,
    "urlBackgroundImage": string | null,
    "nickname": string,
    "bio": string | null,
    "userTag": string | null,
    "accountStatus": AccountStatus
}

type UpdateUserPayload = {
    "email": string,
    "nickname": string,
    "userTag": string,
    "bio": string
}

export const updateUserThunk = createAsyncThunk<
    UpdateUserFullfiled,
    UpdateUserPayload,
    { rejectValue: string }
>("updateUserThunk", async (data, { rejectWithValue }) => {
    try {
        const result = await $api.put<UpdateUserFullfiled>('/api/profile', data)
        return result.data
    } catch (error) {
        return rejectWithValue("Произошла неизвестная ошибка позвоните разработчику 89878884054")
    }
})

