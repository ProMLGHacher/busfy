import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginThunk } from './loginThunk'
import { confirmSignUpThunk } from './confirmSignUpThunk'

export enum UserRole {
    Admin = 'Admin',
    User = 'User'
}
export enum AccountStatus {
    Active = 'Active',
    Suspended = 'Suspended',
    Banned = 'Banned'
}

type AuthState = {
    isLoading: boolean,
    error: undefined | string,
    tokens: {
        accessToken: string | null,
        refreshToken: string | null
    },
    user?: {
        email?: string | null,
        role?: UserRole | null,
        urlIcon?: string | null,
        urlBackgroundImage?: string | null,
        nickname?: string | null,
        bio?: string | null,
        userTag?: string | null,
        accountStatus?: AccountStatus | null
    }
}

const initialState: AuthState = {
    isLoading: false,
    error: undefined,
    tokens: {
        accessToken: null,
        refreshToken: localStorage.getItem('refreshToken')
    },
    user: localStorage.getItem('refreshToken') ? {
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role') as UserRole | null,
        urlIcon: localStorage.getItem('urlIcon'),
        urlBackgroundImage: localStorage.getItem('urlBackgroundImage'),
        nickname: localStorage.getItem('nickname'),
        bio: localStorage.getItem('bio'),
        userTag: localStorage.getItem('userTag'),
        accountStatus: localStorage.getItem('accountStatus') as AccountStatus | null
    } : undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.error = undefined
            state.isLoading = false
            state.tokens.accessToken = null
            state.tokens.refreshToken = null
            state.user = undefined

            localStorage.removeItem('refreshToken')
            localStorage.removeItem('email')
            localStorage.removeItem('role')
            localStorage.removeItem('urlIcon')
            localStorage.removeItem('urlBackgroundImage')
            localStorage.removeItem('nickname')
            localStorage.removeItem('bio')
            localStorage.removeItem('userTag')
            localStorage.removeItem('accountStatus')
        },
        setTokens: (state, action: PayloadAction<{ accessToken: string, refreshToken: string }>) => {
            state.tokens.accessToken = action.payload.accessToken
            state.tokens.refreshToken = action.payload.refreshToken
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.tokens.accessToken = action.payload.tokenPair.accessToken
            state.tokens.refreshToken = action.payload.tokenPair.refreshToken

            state.user = {
                email: payload.profile.email,
                role: payload.profile.role,
                urlIcon: payload.profile.urlIcon,
                urlBackgroundImage: payload.profile.urlBackgroundImage,
                nickname: payload.profile.nickname,
                bio: payload.profile.bio,
                userTag: payload.profile.userTag,
                accountStatus: payload.profile.accountStatus
            }

            localStorage.setItem('refreshToken', action.payload.tokenPair.refreshToken)
            if (action.payload.profile.email) localStorage.setItem('email', action.payload.profile.email);
            if (action.payload.profile.role) localStorage.setItem('role', action.payload.profile.role);
            if (action.payload.profile.urlIcon) localStorage.setItem('urlIcon', action.payload.profile.urlIcon);
            if (action.payload.profile.urlBackgroundImage) localStorage.setItem('urlBackgroundImage', action.payload.profile.urlBackgroundImage);
            if (action.payload.profile.nickname) localStorage.setItem('nickname', action.payload.profile.nickname);
            if (action.payload.profile.bio) localStorage.setItem('bio', action.payload.profile.bio);
            if (action.payload.profile.userTag) localStorage.setItem('userTag', action.payload.profile.userTag);
            localStorage.setItem('accountStatus', action.payload.profile.accountStatus)

            state.error = undefined
            state.isLoading = false
        })
        builder.addCase(loginThunk.rejected, (state, payload) => {
            state.error = payload.payload
            state.isLoading = false
        })
        builder.addCase(confirmSignUpThunk.fulfilled, (state, action) => {
            const payload = action.payload

            state.tokens.accessToken = action.payload.tokenPair.accessToken
            state.tokens.refreshToken = action.payload.tokenPair.refreshToken

            state.user = {
                email: payload.profile.email,
                role: payload.profile.role,
                urlIcon: payload.profile.urlIcon,
                urlBackgroundImage: payload.profile.urlBackgroundImage,
                nickname: payload.profile.nickname,
                bio: payload.profile.bio,
                userTag: payload.profile.userTag,
                accountStatus: payload.profile.accountStatus
            }

            localStorage.setItem('refreshToken', action.payload.tokenPair.refreshToken)
            if (action.payload.profile.email) localStorage.setItem('email', action.payload.profile.email);
            if (action.payload.profile.role) localStorage.setItem('role', action.payload.profile.role);
            if (action.payload.profile.urlIcon) localStorage.setItem('urlIcon', action.payload.profile.urlIcon);
            if (action.payload.profile.urlBackgroundImage) localStorage.setItem('urlBackgroundImage', action.payload.profile.urlBackgroundImage);
            if (action.payload.profile.nickname) localStorage.setItem('nickname', action.payload.profile.nickname);
            if (action.payload.profile.bio) localStorage.setItem('bio', action.payload.profile.bio);
            if (action.payload.profile.userTag) localStorage.setItem('userTag', action.payload.profile.userTag);
            localStorage.setItem('accountStatus', action.payload.profile.accountStatus)

            state.error = undefined
            state.isLoading = false
        })
        builder.addCase(confirmSignUpThunk.rejected, (state, payload) => {
            state.error = payload.payload
            state.isLoading = false
        })
        builder.addCase(confirmSignUpThunk.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
    }
})



export const { logOut, setTokens } = authSlice.actions

export default authSlice.reducer

