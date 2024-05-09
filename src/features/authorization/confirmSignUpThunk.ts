import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../shared/api/api";
import { isAxiosError } from "axios";
import { UserRole, AccountStatus } from "./authSlice";


type ConfirmSignUpFullfiled = {
    "tokenPair": {
      "accessToken": string,
      "refreshToken": string
    },
    "profile": {
        id: string,
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

type ConfirmSignUpPayload = {
    email: string;
    confirmationCode: string;
}

export const confirmSignUpThunk = createAsyncThunk<
    ConfirmSignUpFullfiled,
    ConfirmSignUpPayload,
    { rejectValue: string }
>("confirmSignUpThunk", async (data, { rejectWithValue }) => {
    try {
        const result = await $api.post<ConfirmSignUpFullfiled>('/api/confirm-signup', {
            email: data.email,
            confirmationCode: data.confirmationCode
        })
        return result.data
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return rejectWithValue("Неккоректный код подтверждения или истек период действия")
            }
        }
        return rejectWithValue("Произошла неизвестная ошибка позвоните разработчику 89878884054")
    }
})

