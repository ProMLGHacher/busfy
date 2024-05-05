import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../shared/api/api";
import { isAxiosError } from "axios";
import { UserRole, AccountStatus } from "./authSlice";

type LoginFullfiled = {
    "tokenPair": {
      "accessToken": string,
      "refreshToken": string
    },
    "profile": {
      "email": string,
      "role": UserRole,
      "urlIcon": string | null,
      "urlBackgroundImage": string | null,
      "nickname": string,
      "bio": string | null,
      "userTag": string | null,
      "accountStatus": AccountStatus
    }
  }

type LoginPayload = {
    email: string;
    password: string;
}

export const loginThunk = createAsyncThunk<
    LoginFullfiled,
    LoginPayload,
    { rejectValue: string }
>("logThunk", async (data, { rejectWithValue }) => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const result = await $api.post<LoginFullfiled>('/api/signin', data)
        return result.data
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return rejectWithValue("Данные введены неверно")
            }
            if (error.response?.status === 404) {
                return rejectWithValue("Пароли не совпадают")
            }
        }
        return rejectWithValue("Произошла неизвестная ошибка позвоните разработчику 89878884054")
    }
})

