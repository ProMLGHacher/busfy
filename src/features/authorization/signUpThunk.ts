import { createAsyncThunk } from "@reduxjs/toolkit";
import { $api } from "../../shared/api/api";
import { isAxiosError } from "axios";

type SignUpPayload = {
    "email": string,
    "nickname": string,
    "password": string
  }

export const signUpThunk = createAsyncThunk<
    undefined,
    SignUpPayload,
    { rejectValue: string }
>("signUpThunk", async (data, { rejectWithValue }) => {
    try {
        await $api.post('/api/signup', data)
    } catch (error) {
        if (isAxiosError(error)) {
            if (error.response?.status === 400) {
                return rejectWithValue("Данные введены не верно")
            }
        }
        console.warn(error)
        return rejectWithValue("Произошла неизвестная ошибка позвоните разработчику 89878884054")
    }
})

